"use client";
import { AppUserContext } from "@/app/Context/AppUserContext";
import Loading from "@/app/components/UI/Atom/Loading";
import ScoutingEventView from "@/app/components/UI/Template/ScoutingEventView/ScoutingEventView";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { BlueAllianceAdvLinks } from "@/app/enums/BlueAllianceAdvLinks";
import { BlueAllianceSimpleLinks } from "@/app/enums/BlueAllianceSimpleLinks";
import { IEventInfo } from "@/app/types/IEventInfo";
import { IJustScoutCollection } from "@/app/types/IJustScoutCollection";
import { IRecord } from "@/app/types/IRecord";
import firebaseRequest from "@/app/util/firebaseRequest";
import { User } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ScoutingView() {
  const { userInfo, user, permission } = useContext(AppUserContext);
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const id = searchParams.get("id");
  const [recordsList, setRecordsList] = useState<unknown[][]>([]);
  const [justScoutCollection, setJustScoutCollection] =
    useState<IJustScoutCollection>();
  const [eventName, setEventName] = useState("");
  const [rankLoading, setRankLoading] = useState(false);
  const router = useRouter();
  async function getEventData() {
    const result = (await firebaseRequest(user as User)
      .get(
        `/api/justscout/scouting/event?teamNumber=${userInfo?.teamNumber}&eventId=${eventId}&id=${id}`
      )
      .json()) as {
      eventInfo: IEventInfo;
      justScoutCollection: IJustScoutCollection;
    };

    setEventName(result.eventInfo.name);
    //Extract columns that we need for table columns
    const columnIds = ["", "", ""];
    for (const col of result.justScoutCollection.columns) {
      if (BlueAllianceSimpleLinks.TEAM_NUMBER === col.blueAllianceLink) {
        columnIds[1] = col.id;
      } else if (BlueAllianceSimpleLinks.NAME === col.blueAllianceLink) {
        columnIds[2] = col.id;
      } else if (BlueAllianceAdvLinks.RANK === col.blueAllianceLink) {
        columnIds[0] = col.id;
      }
    }
    //Get formatted record data for recordsList
    let records = result.justScoutCollection.records;
    let recordsListResult = [];
    for (const recordsKey in records) {
      let recordData = records[recordsKey];
      let recordResult = ["", "", "", recordsKey];
      for (const record of recordData) {
        if (record.id === columnIds[0]) {
          recordResult[0] = record.value as string;
        } else if (record.id === columnIds[1]) {
          recordResult[1] = record.value as string;
        } else if (record.id === columnIds[2]) {
          recordResult[2] = record.value as string;
        }
      }
      recordsListResult.push(recordResult);
    }
    setRecordsList(recordsListResult);
    setJustScoutCollection(result.justScoutCollection);
  }

  useEffect(() => {
    updateRankings();
  }, []);

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

  async function updateRankings() {
    setRankLoading(true);
    const api = firebaseRequest(user as User);
    await api
      .get(
        `/api/justscout/scouting/event/update-rankings?teamNumber=${userInfo?.teamNumber}&eventId=${eventId}&id=${id}`
      )
      .json();
    setRankLoading(false);
    await getEventData();
  }

  if (!justScoutCollection) {
    return <Loading />;
  }
  return (
    <ScoutingEventView
      permissions={permission}
      name={eventName}
      columns={justScoutCollection?.columns}
      updateTeamProp={updateTeam}
      rankLoad={rankLoading}
      updateRanking={updateRankings}
      recordsProp={justScoutCollection?.records}
      recordListProp={recordsList}
      navigateEdit={() =>
        router.push(`${AppRoutes.SCOUTING_EDIT}?eventId=${eventId}&id=${id}`)
      }
    />
  );
}
