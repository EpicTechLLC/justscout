import { IFirstAncillary } from "@/app/types/IFirstAncillary";
import { ITeam } from "@/app/types/ITeam";
import { ITeamList } from "@/app/types/ITeamList";
import firstAPI from "@/app/util/firstapi";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest, res: NextResponse<ITeamList>) {
  const api = firstAPI();
  const ancillary = (await api.get("").json()) as IFirstAncillary;
  let currentSeason = ancillary.currentSeason;
  const result = (await api
    .get(`${currentSeason}/teams`, { cache: "force-cache" })
    .json()) as ITeamList;
  let teams = result.teams;
  for (let page = 2; page <= result.pageTotal; page++) {
    const tempResult = (await api
      .get(`${currentSeason}/teams?page=${page}`, { cache: "force-cache" })
      .json()) as ITeamList;
    teams = teams.concat(tempResult.teams);
  }

  return NextResponse.json(teams);
}
