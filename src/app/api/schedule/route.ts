import { NextRequest, NextResponse } from "next/server";
import blueAllianceAPI from "@/app/util/blueallianceapi";

export async function GET(_request: NextRequest) {
  const eventKey = _request.nextUrl.searchParams.get("eventKey");
  if (eventKey) {
    let url = `event/${eventKey}/matches/simple`;
    const api = blueAllianceAPI();
    const result = (await api.get(url).json()) as any;
    return NextResponse.json(result);
  }

  return new NextResponse();
}
