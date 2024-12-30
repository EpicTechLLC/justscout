import { NextResponse, type NextRequest } from "next/server";
import { TeamInfoSimpleType } from "../../types/TeamInfoSimpleType ";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query || isNaN(Number(query))) {
    return NextResponse.json({ error: "Invalid team number" }, { status: 400 });
  }

  const teamNumber = query.toString();
  const authKey = process.env.NEXT_BLUE_ALLIANCE_API_KEY;
  const blueAllianceUrl = `https://www.thebluealliance.com/api/v3/team/frc${teamNumber}/simple`;

  try {
    const response = await fetch(blueAllianceUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-TBA-Auth-Key": authKey || "",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Team not found" },
        { status: response.status }
      );
    }

    const teamData = (await response.json()) as TeamInfoSimpleType;
    return NextResponse.json(teamData, { status: 200 });
  } catch (error) {
    console.error("Error fetching data from The Blue Alliance:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
