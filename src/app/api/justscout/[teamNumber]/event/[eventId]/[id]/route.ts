import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: { teamNumber: string; eventId: string; id: string } }
) {
  const { teamNumber, eventId, id } = params;
  const db = admin.firestore();
  const teamDoc = await db.doc(`Teams/${teamNumber}/${eventId}/${id}`).get();
  if (teamDoc.exists) {
    return NextResponse.json(teamDoc.data());
  }
  return NextResponse.json({ error: "No data" }, { status: 404 });
}
