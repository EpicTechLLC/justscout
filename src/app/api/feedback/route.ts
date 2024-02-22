import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest) {
  const { name, category, email, feedback } = await _request.json();
  if (name && category && email && feedback) {
    const db = admin.firestore();
    await db.collection(`feedback`).add({ name, category, email, feedback });
    return new NextResponse(undefined, { status: 201 });
  } else {
    console.error(
      `Data missing to add feedback`,
      name,
      category,
      email,
      feedback
    );

    return NextResponse.json(
      { error: `Data missing to add feedback` },
      { status: 422 }
    );
  }
}
