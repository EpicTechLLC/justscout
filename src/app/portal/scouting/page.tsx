"use client";
import { AppUserContext } from "@/app/Context/AppUserContext";
import ScoutingDashboard from "@/app/components/UI/Template/ScoutingDashboardTemplate/ScoutingDashboardTemplate";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { IEventInfo } from "@/app/types/IEventInfo";
import firebaseRequest from "@/app/util/firebaseRequest";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function TeamEventAdd() {
  const { userInfo, user, permission } = useContext(AppUserContext);
  const [eventList, setEventList] = useState<IEventInfo[]>([]);
  const router = useRouter();
  async function getTeamEvents() {
    const result = await firebaseRequest(user as User)
      .get(`/api/justscout/scouting?teamNumber=${userInfo?.teamNumber}`)
      .json();
    let resultArray = [];
    for (const item of Object.values(result as any)) {
      resultArray.push(item as IEventInfo);
    }
    setEventList(resultArray);
  }

  useEffect(() => {
    getTeamEvents();
  }, []);

  return (
    <ScoutingDashboard
      permissions={permission}
      eventList={eventList}
      navigateEvent={(event: IEventInfo) =>
        router.push(
          `${AppRoutes.SCOUTING_EVENT}?eventId=${event.eventId}&id=${event.id}`
        )
      }
      navigateNew={() => router.push(AppRoutes.SCOUTING_NEW)}
    />
  );
}
