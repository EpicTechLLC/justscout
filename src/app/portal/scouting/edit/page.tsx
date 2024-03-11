"use client";
import { AppUserContext } from "@/app/Context/AppUserContext";
import BAEventSelector from "@/app/components/UI/Organism/BAEventSelector/BAEventSelector";
import DynamicEditor from "@/app/components/UI/Organism/DynamicEditor/DynamicEditor";
import DynamicView from "@/app/components/UI/Organism/DynamicView/DynamicView";
import StepperWrapperTemplate from "@/app/components/UI/Template/StepperWrapperTemplate/StepperWrapperTemplate";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { IBlueAllianceEventSimple } from "@/app/types/IBlueAllianceEventSimple";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import { IEventInfo } from "@/app/types/IEventInfo";
import { IJustScoutCollection } from "@/app/types/IJustScoutCollection";
import { IRecord } from "@/app/types/IRecord";
import addColumn from "@/app/util/addColumn";
import firebaseRequest from "@/app/util/firebaseRequest";
import removeCol from "@/app/util/removeCol";
import updateColumns from "@/app/util/updateColumns";
import updateRecords from "@/app/util/updateRecords";
import { User } from "firebase/auth";
import ky from "ky";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ScoutingNew() {
  const { user, userInfo, loadingUser } = useContext(AppUserContext);
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const id = searchParams.get("id");
  const [teamEventsList, setTeamEventsList] = useState<
    IBlueAllianceEventSimple[]
  >([]);
  const [eventID, setEventID] = useState("");
  const [eventName, setEventName] = useState("");
  const [columns, setColumns] = useState<IColumnProperties[]>([]);
  const [exampleRecords, setExampleRecords] = useState<IRecord[]>([]);
  const [valid, setValid] = useState(false);
  const [oldEventInfo, setOldEventInfo] = useState<IEventInfo>();
  const router = useRouter();
  async function getTeamEvents() {
    let result = (await ky
      .get(`/api/blue-alliance/events/${userInfo?.teamNumber}`)
      .json()) as IBlueAllianceEventSimple[];
    setTeamEventsList(result);
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

    setEventName(result.eventInfo.name);
    setEventID(result.eventInfo.eventId);
    setColumns(result.justScoutCollection.columns);
    setOldEventInfo(result.eventInfo);
  }

  useEffect(() => {
    getEventData();
  }, []);

  useEffect(() => {
    if (!loadingUser && userInfo?.teamNumber) {
      getTeamEvents();
    }
  }, [loadingUser]);

  useEffect(() => {
    validateColumns();
  }, [columns]);

  const eventSelected = (event: IBlueAllianceEventSimple) => {
    setEventID(event.key); //Update eventID
    setEventName(`${event.name} (${event.year})`); //Update Event Selected Text
    setValid(true);
  };

  function validateColumns() {
    if (0 === columns.length) {
      setValid(false);
      return;
    }
    let recordList: IRecord[] = [];
    for (let column of columns) {
      if (!column.label || column.label === "") {
        setValid(false);
        return;
      }
      recordList.push({
        id: column.id,
        value: "",
      } as IRecord);
    }
    setExampleRecords(recordList);
    setValid(true);
  }

  async function finish() {
    if (eventID === "") return;
    const data = {
      eventID,
      eventName,
      columns,
      teamNumber: userInfo?.teamNumber,
      id: id,
      oldEventId: oldEventInfo?.eventId,
    };
    const api = firebaseRequest(user as User);
    const result = (await api
      .put("/api/justscout/scouting", { json: data })
      .json()) as { id: string };
    router.push(
      `${AppRoutes.SCOUTING_EVENT}?eventId=${eventID}&id=${result.id}`
    );
  }

  function stepUpdated(stepNumber: number) {
    if (0 === stepNumber) {
      setValid(eventID !== "");
      return;
    } else if (1 === stepNumber) {
      validateColumns();
      return;
    }
  }
  return (
    <StepperWrapperTemplate
      valid={valid}
      stepLabels={["Event", "Scouting", "Preview"]}
      componentsArray={[
        <BAEventSelector
          eventList={teamEventsList}
          rowClick={eventSelected}
          selectedEventID={eventID}
        />,
        <DynamicEditor
          title="Set up Scouting Options"
          addColumn={() => addColumn(columns, setColumns)}
          columns={columns}
          removeCol={(id) => removeCol(id, columns, setColumns)}
          onChange={(change) => {
            updateColumns(change, columns, setColumns);
          }}
        />,
        <DynamicView
          title={`This is what your scout team will see for ${eventName}`}
          columns={columns}
          records={exampleRecords}
          onChange={(change) => {
            updateRecords(change, exampleRecords, setExampleRecords);
          }}
        />,
      ]}
      finish={finish}
      stepUpdate={stepUpdated}
    />
  );
}
