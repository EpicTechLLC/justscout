"use client";

import Loading from "@/app/components/UI/Atom/Loading";
import FirstTeamInfoTemplate from "@/app/components/UI/Template/FirstTeamInfoTemplate/FirstTeamInfoTemplate";
import JustScoutTeamInfoTemplate from "@/app/components/UI/Template/JustScoutTeamInfoTemplate/JustScoutTeamInfoTemplate";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { IEventInfo } from "@/app/types/IEventInfo";
import { ITeam } from "@/app/types/ITeam";
import { IUserInfo } from "@/app/types/IUserInfo";
import firebaseRequest from "@/app/util/firebaseRequest";
import { User, getAuth } from "firebase/auth";
import ky from "ky";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function TeamPage({
  params,
}: {
  params: { teamNumber: string };
}) {
  const [user, loadingAuth] = useAuthState(getAuth());
  const [teamInfo, setTeamInfo] = useState<ITeam>();
  const [events, setEvents] = useState<IEventInfo[]>([]);
  const [userTeamNumber, setUserTeamNumber] = useState<string>("");
  const router = useRouter();

  async function getUserInfo() {
    const api = firebaseRequest(user as User);
    let result = (await api
      ?.get("/api/settings/account-info")
      .json()) as IUserInfo;
    if (result) {
      setUserTeamNumber(result.teamNumber);
    }
  }

  async function getInfo() {
    const teamInfo = (await ky
      .get(`/api/team/${params.teamNumber}`)
      .json()) as ITeam;
    setTeamInfo(teamInfo);
  }
  async function getJustScoutInfo() {
    const justScoutTeamInfo = (await ky
      .get(`/api/justscout/${params.teamNumber}/team`)
      .json()) as any;
    if (justScoutTeamInfo) {
      const events: IEventInfo[] = [];
      for (const key of Object.keys(justScoutTeamInfo)) {
        events.push(justScoutTeamInfo[key] as IEventInfo);
      }
      setEvents(events);
    }
  }
  useEffect(() => {
    getInfo();
    getJustScoutInfo();
  }, []);

  useEffect(() => {
    if (!loadingAuth && user) {
      getUserInfo();
    }
  }, [loadingAuth]);

  const redirectEvent = (event: IEventInfo) => {
    router.push(`
      ${AppRoutes.TEAM}/${params.teamNumber}/${event.eventId}/${event.id}`);
  };

  const redirectAdd = () => {
    router.push(`
      ${AppRoutes.TEAM_PORTAL_ADD}`);
  };
  return (
    <Fragment>
      {teamInfo ? <FirstTeamInfoTemplate {...teamInfo} /> : <Loading />}

      <JustScoutTeamInfoTemplate
        events={events}
        isTeamMember={String(userTeamNumber) === params.teamNumber}
        redirectEvent={redirectEvent}
        redirectAdd={redirectAdd}
      />
    </Fragment>
  );
}
