import { IFirstAncillary } from "@/app/types/IFirstAncillary";
import { ITeamList } from "@/app/types/ITeamList";
import authenticateFirebaseToken from "@/app/util/authenticateFirebaseToken";
import firstAPI from "@/app/util/firstapi";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { ITeamMember } from "@/app/types/ITeamMember";
import { PermissionTypes } from "@/app/enums/PermissionTypes";
import { IUserInfo } from "@/app/types/IUserInfo";

export async function GET(
  _request: NextRequest,
  { params }: { params: { teamNumber: string } }
) {
  const teamNumber = params.teamNumber;
  const { uid, email, name, email_verified } = (await authenticateFirebaseToken(
    headers()
  )) as DecodedIdToken;
  if (uid) {
    const db = admin.database();
    const teamRef = db.ref(`teams/${teamNumber}`);
    const snapshot = await teamRef.child(`Name`).once("value");
    if (snapshot.val() === null) {
      const api = firstAPI();
      const ancillary = (await api.get("").json()) as IFirstAncillary;
      let currentSeason = ancillary.currentSeason;
      const teamInfo = (await api
        .get(`${currentSeason}/teams?teamNumber=${teamNumber}`)
        .json()
        .catch((e) => {
          return null;
        })) as ITeamList;

      if (teamInfo && teamInfo.teams[0].nameShort) {
        teamRef.child("Name").set(teamInfo.teams[0].nameShort);
      } else {
        return NextResponse.error();
      }
    }
    const userData: IUserInfo = {
      createdTimestamp: Date.now(),
      displayName: name,
      teamNumber: teamNumber,
      email: String(email),
      emailVerified: Boolean(email_verified),
      role: PermissionTypes.MEMBER,
    };
    const userDataStripped: ITeamMember = {
      joinedTimestamp: userData.createdTimestamp,
      email: userData.email,
      displayName: userData.displayName,
      createdTimestamp: userData.createdTimestamp,
    };
    teamRef.child(`Members/${uid}`).set(userDataStripped);
    db.ref(`users/${uid}`).set(userData);
  }
  //   return NextResponse.json({ error: "Error" }, { status: 404 });
  return new NextResponse();
}
