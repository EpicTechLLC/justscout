"use client";
import { AppUserContext } from "@/app/Context/AppUserContext";
import Loading from "@/app/components/UI/Atom/Loading";
import ScheduleTemplate from "@/app/components/UI/Template/ScheduleTemplate/ScheduleTemplate";
import { IBlueAllianceSchedule } from "@/app/types/IBlueAllainceSchedule";
import { IEventInfo } from "@/app/types/IEventInfo";
import { IJustScoutCollection } from "@/app/types/IJustScoutCollection";
import { IRecord } from "@/app/types/IRecord";
import firebaseRequest from "@/app/util/firebaseRequest";
import { User } from "firebase/auth";
import ky from "ky";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Schedule() {
  const { userInfo, user, permission, loadingUser } =
    useContext(AppUserContext);
  const [rows, setRows] = useState<IBlueAllianceSchedule[]>([]);
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const id = searchParams.get("id");
  const [isTeam, setIsTeam] = useState(true);
  const [schedule, setSchedule] = useState<IBlueAllianceSchedule[]>([]);
  const [justScoutCollection, setJustScoutCollection] =
    useState<IJustScoutCollection>();
  async function getSchedule() {
    const result = (await ky
      .get(`/api/schedule?eventKey=${eventId}`)
      .json()) as any;
    setSchedule(result);
  }
  function setVisibleRows() {
    if (!isTeam) {
      setRows(schedule);
    } else {
      let newRows: IBlueAllianceSchedule[] = [];
      const teamNumberStr = String(userInfo?.teamNumber);
      for (const row of schedule) {
        const existOnRed = row.alliances.red.team_keys.find(
          (teamKey) => teamKey.split("frc")[1] === teamNumberStr
        );
        const existOnBlue = row.alliances.blue.team_keys.find(
          (teamKey) => teamKey.split("frc")[1] === teamNumberStr
        );
        if (existOnBlue || existOnRed) {
          newRows.push(row);
        }
      }
      setRows(newRows);
    }
  }
  async function getEventData() {
    const result = (await firebaseRequest(user as User)
      .get(
        `/api/justscout/scouting/event?teamNumber=${userInfo?.teamNumber}&eventId=${eventId}&id=${id}`
      )
      .json()) as {
      eventInfo: IEventInfo;
      justScoutCollection: IJustScoutCollection;
    };
    setJustScoutCollection(result.justScoutCollection);
  }

  useEffect(() => {
    if (!loadingUser) {
      getSchedule();
      getEventData();
    }
  }, []);

  useEffect(() => {
    if (!loadingUser && schedule.length > 0) {
      setVisibleRows();
    }
  }, [isTeam, schedule, loadingUser]);
  async function updateTeam(record: IRecord[], recordId: string) {
    const data = {
      eventId,
      id: id,
      teamNumber: userInfo?.teamNumber,
      record: record,
      recordId: recordId,
    };
    const api = firebaseRequest(user as User);
    await api
      .post("/api/justscout/scouting/event/record", { json: data })
      .json();
    await getEventData();
  }
  if (!justScoutCollection || !userInfo) {
    return <Loading />;
  }
  return (
    <ScheduleTemplate
      rows={rows}
      teamNumber={userInfo.teamNumber}
      eventData={justScoutCollection}
      updateTeamProps={updateTeam}
      changeSchedule={() => setIsTeam(!isTeam)}
      scheduleButtonView={isTeam ? "Team" : "Full Schedule"}
    />
  );
}
