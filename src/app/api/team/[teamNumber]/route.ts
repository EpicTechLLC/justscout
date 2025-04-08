import { IFirstAncillary } from "@/app/types/IFirstAncillary";
import { ITeamList } from "@/app/types/ITeamList";
import firstAPI from "@/app/util/firstapi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { teamNumber: string } }
) {
  const teamNumber = params.teamNumber;
  const api = firstAPI();
  let currentSeason = new Date().getFullYear().toString();
  const teamInfo = (await api
    .get(`${currentSeason}/teams?teamNumber=${teamNumber}`)
    .json()
    .catch((e) => {
      return null;
    })) as ITeamList;
  if (teamInfo && teamInfo !== null) {
    return NextResponse.json(teamInfo.teams[0]);
  } else {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }
}
