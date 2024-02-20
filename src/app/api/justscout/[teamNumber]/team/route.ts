import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: { teamNumber: string } }
) {
  const teamNumber = params.teamNumber;
  const db = admin.firestore();
  const teamDoc = await db.doc(`Teams/${teamNumber}`).get();
  if (teamDoc.exists) {
    return NextResponse.json(teamDoc.data());
  }
  return new NextResponse(null, { status: 204 });
}
