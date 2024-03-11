import { IEventInfo } from "@/app/types/IEventInfo";
import authenticateFirebaseToken from "@/app/util/authenticateFirebaseToken";
import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  const { uid } = (await authenticateFirebaseToken(
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
    const infoRef = await db.doc(`scouting/${teamNumber}`).get();
    if (docRef.exists && infoRef.exists) {
      const info = (infoRef.data() as any)[id] as IEventInfo;
      return NextResponse.json({
        eventInfo: info,
        justScoutCollection: docRef.data(),
      });
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
