import blueAllianceAPI from "@/app/util/blueallianceapi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { teamNumber: string } }
) {
  const teamNumber = params.teamNumber;
  const api = blueAllianceAPI();
  const result = await api
    .get(`team/frc${teamNumber}/events/simple`)
    .json()
    .catch((e) => {
      return null;
    });
  return NextResponse.json(result);
}
