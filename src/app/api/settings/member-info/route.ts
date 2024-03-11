import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import authenticateFirebaseToken from "@/app/util/authenticateFirebaseToken";
import { DecodedIdToken } from "firebase-admin/auth";

export async function GET(_request: NextRequest) {
  const { uid } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (uid) {
    const teamNumber = _request.nextUrl.searchParams.get("teamNumber");
    const db = admin.database();
    const ref = db.ref(`teams/${teamNumber}/Members/${uid}`);
    const snapshot = await ref.once("value", function (snapshot) {
      return snapshot.val();
    });
    return NextResponse.json(snapshot.val());
  } else {
    return NextResponse.json({ status: 401 });
  }
}
