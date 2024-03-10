import { BlueAllianceAdvLinks } from "@/app/enums/BlueAllianceAdvLinks";
import { BlueAllianceSimpleLinks } from "@/app/enums/BlueAllianceSimpleLinks";
import { IBlueAllianceEventRanking } from "@/app/types/IBlueAllianceEventRanking";
import { IJustScoutCollection } from "@/app/types/IJustScoutCollection";
import authenticateFirebaseToken from "@/app/util/authenticateFirebaseToken";
import blueAllianceAPI from "@/app/util/blueallianceapi";
import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  const { uid, name } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  const teamNumber = _request.nextUrl.searchParams.get("teamNumber");
  const eventId = _request.nextUrl.searchParams.get("eventId");
  const id = _request.nextUrl.searchParams.get("id");
  if (uid && id && eventId && teamNumber) {
    const db = admin.firestore();
    const docRef = await db
      .doc(`scouting/${teamNumber}/${eventId}/${id}`)
      .get();
    if (docRef.exists) {
      const data = docRef.data() as IJustScoutCollection;
      const rankColumnId = data.columns.find(
        (col) => col.blueAllianceLink === BlueAllianceAdvLinks.RANK
      )?.id;
      const teamNumberId = data.columns.find(
        (col) => col.blueAllianceLink === BlueAllianceSimpleLinks.TEAM_NUMBER
      )?.id;
      if (rankColumnId && teamNumberId) {
        const records = data.records;
        const BAResult = (await blueAllianceAPI()
          .get(`event/${eventId}/rankings`)
          .json()) as IBlueAllianceEventRanking;
        for (const recordKey in records) {
          let record = records[recordKey];
          let rankIndex = record.findIndex((rec) => rec.id === rankColumnId);
          let teamNumberIndex = record.findIndex(
            (rec) => rec.id === teamNumberId
          );
          const rankingData = BAResult.rankings.find(
            (rank) =>
              rank.team_key.split("frc")[1] ===
              String(record[teamNumberIndex].value)
          );
          record[rankIndex].value = rankingData?.rank;
        }
        await db
          .doc(`scouting/${teamNumber}/${eventId}/${id}`)
          .set({ records: records }, { merge: true });
      }
    }
    return NextResponse.json({}, { status: 200 });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
