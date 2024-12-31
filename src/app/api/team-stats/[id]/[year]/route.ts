import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: number; year: number }> }
) {
  const params = await props.params;
  const { id, year } = params;

  if (!id || !year) {
    return NextResponse.json(
      { error: "Missing team ID or Year" },
      { status: 400 }
    );
  }

  try {
    const response1 = await fetch(
      `https://api.statbotics.io/v3/team_year/${id}/${year}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response1.ok) {
      throw new Error(`Failed to fetch data: ${response1.statusText}`);
    }

    const data = (await response1.json()) as TeamStatsType;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
