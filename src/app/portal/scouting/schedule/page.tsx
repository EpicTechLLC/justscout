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
  const [rows, setRows] = useState<IBlueAllianceSchedule[]>();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const id = searchParams.get("id");
  const [isTeam, setIsTeam] = useState(true);
  const [schedule, setSchedule] = useState<IBlueAllianceSchedule[]>([]);
  const [justScoutCollection, setJustScoutCollection] =
    useState<IJustScoutCollection>();
  async function getSchedule() {
    let url = `/api/schedule?eventKey=${eventId}`;
    const result = (await ky.get(url).json()) as any;
    setSchedule(result);
  }
  function setVisibleRows() {
    if (!isTeam) {
      setRows(schedule);
    } else {
      let newRows = [];
      for (let row of schedule) {
        const existOnRed = row.alliances.red.team_keys.filter(
          (x) => x.split("frc")[1] === userInfo?.teamNumber
        );
        const existOnBlue = row.alliances.blue.team_keys.filter(
          (x) => x.split("frc")[1] === userInfo?.teamNumber
        );
        if (existOnBlue.length !== 0 || existOnRed.length !== 0) {
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
    if (schedule && !loadingUser) {
      setVisibleRows();
    }
  }, [isTeam, schedule]);
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
  if (!rows || !justScoutCollection || !userInfo) {
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
