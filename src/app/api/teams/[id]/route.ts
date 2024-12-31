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
    const one = id * 2,
      two = id * 2 + 1;
    const authKey = process.env.NEXT_BLUE_ALLIANCE_API_KEY;
    const response1 = await fetch(
      `https://www.thebluealliance.com/api/v3/teams/${one}/simple`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-TBA-Auth-Key": authKey || "",
        },
      }
    );
    const response2 = await fetch(
      `https://www.thebluealliance.com/api/v3/teams/${two}/simple`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-TBA-Auth-Key": authKey || "",
        },
      }
    );

    if (!response1.ok) {
      throw new Error(`Failed to fetch data: ${response1.statusText}`);
    } else if (!response2.ok) {
      throw new Error(`Failed to fetch data: ${response2.statusText}`);
    }

    const data = ((await response1.json()) as Teams).concat(
      (await response2.json()) as Teams
    );
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
