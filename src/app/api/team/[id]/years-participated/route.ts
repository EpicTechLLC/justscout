import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: number }> }
) {
  const params = await props.params;
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing team ID" }, { status: 400 });
  }

  try {
    const authKey = process.env.NEXT_BLUE_ALLIANCE_API_KEY;
    const response1 = await fetch(
      `https://www.thebluealliance.com/api/v3/team/frc${id}/years_participated`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-TBA-Auth-Key": authKey || "",
        },
      }
    );

    if (!response1.ok) {
      throw new Error(`Failed to fetch data: ${response1.statusText}`);
    }

    const data = (await response1.json()) as number[];
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
