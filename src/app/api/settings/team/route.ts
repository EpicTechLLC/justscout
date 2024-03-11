import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import authenticateFirebaseToken from "@/app/util/authenticateFirebaseToken";
import { DecodedIdToken } from "firebase-admin/auth";
import { PermissionTypes } from "@/app/enums/PermissionTypes";

export async function GET(_request: NextRequest) {
  const { uid } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;

  if (uid) {
    const teamNumber = _request.nextUrl.searchParams.get("teamNumber");
    const db = admin.database();
    const ref = db.ref(`teams/${teamNumber}/Members`);
    const snapshot = await ref.once("value", function (snapshot) {
      return snapshot.val();
    });
    return NextResponse.json(snapshot.val());
  } else {
    return NextResponse.json({ status: 401 });
  }
}

export async function POST(_request: NextRequest) {
  const { uid: requestorUID } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (requestorUID) {
    const { uid, role, teamNumber } = await _request.json();
    if (uid && role && teamNumber) {
      const db = admin.database();
      const ref = db.ref(`teams/${teamNumber}/Members/${requestorUID}/role`);
      const snapshot = (
        await ref.once("value", function (snapshot) {
          return snapshot.val();
        })
      ).val();
      if (snapshot === PermissionTypes.ADMIN) {
        const memberRef = db.ref(`teams/${teamNumber}/Members/${uid}`);
        memberRef.update({ role: role });
      }
      return NextResponse.json({}, { status: 200 });
    } else {
      console.error(`Data missing to update role`, uid, role);
      return NextResponse.json(
        { error: `Data missing to update role` },
        { status: 422 }
      );
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
export async function DELETE(_request: NextRequest) {
  const { uid: requestorUID } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (requestorUID) {
    const { uid, teamNumber } = await _request.json();
    if (uid && teamNumber) {
      const db = admin.database();
      const ref = db.ref(`teams/${teamNumber}/Members/${requestorUID}/role`);
      const snapshot = (
        await ref.once("value", function (snapshot) {
          return snapshot.val();
        })
      ).val();
      if (snapshot === PermissionTypes.ADMIN) {
        const memberRef = db.ref(`teams/${teamNumber}/Members/${uid}`);
        const usersRef = db.ref(`users/${uid}`);
        memberRef.remove();
        usersRef.remove();
      }
      return NextResponse.json({}, { status: 200 });
    } else {
      console.error(`Data missing to remove user`, uid);
      return NextResponse.json(
        { error: `Data missing to remove user` },
        { status: 422 }
      );
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
