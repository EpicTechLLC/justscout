import authenticateFirebaseToken from "@/app/util/authenticateFirebaseToken";
import { DecodedIdToken } from "firebase-admin/auth";
import { headers } from "next/headers";
import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_request: NextRequest) {
  const { uid, name } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (uid) {
    const { eventId, id, teamNumber } = await _request.json();
    if (eventId && id && teamNumber) {
      const db = admin.firestore();
      const docRef = db.doc(`Teams/${teamNumber}`);
      docRef.update({ [id]: admin.firestore.FieldValue.delete() }).then(() => {
        const docRef2 = db.doc(`Teams/${teamNumber}/${eventId}/${id}`);
        docRef2.delete();
      });
    } else {
      console.error(`Data missing to add event`, eventId, id, teamNumber);
      return NextResponse.json(
        { error: `Data missing to delete event` },
        { status: 422 }
      );
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return new NextResponse();
}
