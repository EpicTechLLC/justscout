"use client";

import TeamInfoTemplate from "@/app/components/UI/Template/TeamInfoTemplate/TeamInfoTemplate";
import { ITeam } from "@/app/types/ITeam";
import { ITeamList } from "@/app/types/ITeamList";
import ky from "ky";
import { Fragment, useEffect, useState } from "react";

export default function TeamPage({
  params,
}: {
  params: { teamNumber: string };
}) {
  const [teamInfo, setTeamInfo] = useState<ITeam>();
  async function getInfo() {
    const teamInfo = (await ky
      .get(`/api/team/${params.teamNumber}`)
      .json()) as ITeam;
    setTeamInfo(teamInfo);
  }
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Fragment>{teamInfo ? <TeamInfoTemplate {...teamInfo} /> : null}</Fragment>
  );
}
