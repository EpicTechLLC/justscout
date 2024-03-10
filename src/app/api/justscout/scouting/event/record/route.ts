import authenticateFirebaseToken from "@/app/util/authenticateFirebaseToken";
import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest) {
  const { uid, name } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (uid) {
    const { eventId, id, teamNumber, record, recordId } = await _request.json();
    if (eventId && id && teamNumber && record && recordId) {
      const db = admin.firestore();
      const docRef = await db
        .doc(`scouting/${teamNumber}/${eventId}/${id}`)
        .set(
          { records: { [recordId]: record } },
          {
            merge: true,
          }
        );
      return NextResponse.json({}, { status: 201 });
    } else {
      console.error(
        `Data missing to update scouting event record`,
        eventId,
        id,
        teamNumber,
        record,
        recordId
      );
      return NextResponse.json(
        { error: `Data missing to add scouting event` },
        { status: 422 }
      );
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
