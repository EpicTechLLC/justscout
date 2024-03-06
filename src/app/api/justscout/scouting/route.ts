import { IEventInfo } from "@/app/types/IEventInfo";
import { IJustScoutCollection } from "@/app/types/IJustScoutCollection";
import { ISharedEventInfo } from "@/app/types/ISharedEventInfo";
import authenticateFirebaseToken from "@/app/util/authenticateFirebaseToken";
import blueAllianceAPI from "@/app/util/blueallianceapi";
import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function CreateData(
  teamNumber: string,
  eventID: string,
  referenceData: IEventInfo,
  docData: IJustScoutCollection
) {
  const db = admin.firestore();
  const docRef = await db
    .collection(`scouting/${teamNumber}/${eventID}`)
    .add(docData);
  const referenceDoc = {
    [docRef.id]: {
      ...referenceData,
      id: docRef.id,
      eventId: eventID,
    },
  };
  await db.doc(`scouting/${teamNumber}`).set(referenceDoc, {
    merge: true,
  });
}

export async function POST(_request: NextRequest) {
  const { uid, name } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (uid) {
    const { eventID, eventName, columns, teamNumber } = await _request.json();
    if (eventID && eventName && columns && teamNumber) {
      const now = Date.now();
      const docData: IJustScoutCollection = {
        columns: columns,
        records: [],
      };
      const referenceData: IEventInfo = {
        modified: now,
        name: eventName,
        modifiedByName: name,
        id: "",
        eventId: "",
      };

      //   const BAResult = await blueAllianceAPI()
      //     .get(`event/${eventID}/teams`)
      //     .json();
      //   console.log(BAResult);
      CreateData(teamNumber, eventID, referenceData, docData);
    } else {
      console.error(
        `Data missing to add scouting event`,
        eventID,
        eventName,
        columns,
        teamNumber
      );
      return NextResponse.json(
        { error: `Data missing to add scouting event` },
        { status: 422 }
      );
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({});
}
