import authenticateFirebaseToken from "@/app/util/authenticateFirebaseToken";
import { DecodedIdToken } from "firebase-admin/auth";
import { headers } from "next/headers";
import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { ISharedEventInfo } from "@/app/types/ISharedEventInfo";

export async function POST(_request: NextRequest) {
  const { uid, name } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (uid) {
    const { eventID, eventName, columns, teamNumber } = await _request.json();
    if (eventID && eventName && columns && teamNumber) {
      const now = Date.now();
      const docData: ISharedEventInfo = {
        name: eventName,
        columns: columns,
        createdBy: uid,
        modifiedBy: uid,
        modifiedByName: name,
        timeStamp: now,
        modified: now,
      };
      const db = admin.firestore();
      const docRef = await db
        .collection(`Teams/${teamNumber}/${eventID}`)
        .add(docData);
      const referenceDoc = {
        [docRef.id]: {
          id: docRef.id,
          modified: now,
          name: eventName,
          modifiedByName: name,
          eventId: eventID,
        },
      };
      await db.doc(`Teams/${teamNumber}`).set(referenceDoc, {
        merge: true,
      });
    } else {
      console.error(
        `Data missing to add event`,
        eventID,
        eventName,
        columns,
        teamNumber
      );
      return NextResponse.json(
        { error: `Data missing to add event` },
        { status: 422 }
      );
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({});
}
