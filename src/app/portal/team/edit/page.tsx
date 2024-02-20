"use client";
import { AppUserContext } from "@/app/Context/AppUserContext";
import BAEventSelector from "@/app/components/UI/Organism/BAEventSelector/BAEventSelector";
import ColumnEditor from "@/app/components/UI/Organism/ColumnEditor/ColumnEditor";
import StepperWrapperTemplate from "@/app/components/UI/Template/StepperWrapperTemplate/StepperWrapperTemplate";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { IBlueAllianceEventSimple } from "@/app/types/IBlueAllianceEventSimple";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import { ISharedEventInfo } from "@/app/types/ISharedEventInfo";
import addColumn from "@/app/util/addColumn";
import firebaseRequest from "@/app/util/firebaseRequest";
import removeCol from "@/app/util/removeCol";
import updateColumns from "@/app/util/updateColumns";
import { User } from "firebase/auth";
import ky from "ky";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";

export default function TeamEventEdit() {
  const searchParams = useSearchParams();
  const teamNumber = searchParams.get("teamNumber");
  const eventId = searchParams.get("eventId");
  const id = searchParams.get("id");
  const { userInfo, user } = useContext(AppUserContext);
  const [teamEvents, setTeamEvents] = useState<IBlueAllianceEventSimple[]>([]);
  const [valid, setValid] = useState(false);
  const [columns, setColumns] = useState<IColumnProperties[]>([]);
  const [eventID, setEventID] = useState<string>("");
  const [eventName, setEventName] = useState<string>();
  const api = firebaseRequest(user as User);
  const router = useRouter();
  async function getTeamEvents() {
    setTeamEvents(
      (await ky
        .get(`/api/team/events/${userInfo?.teamNumber}`)
        .json()) as IBlueAllianceEventSimple[]
    );
  }
  useEffect(() => {
    getTeamEvents();
  }, []);
  async function getEventData() {
    try {
      const result = (await api
        .get(
          `/api/justscout/event?teamNumber=${teamNumber}&eventId=${eventId}&id=${id}`
        )
        .json()) as ISharedEventInfo;
      if (result) {
        setEventID(eventId as string);
        setColumns(result.columns);
        setEventName(result.name);
        setValid(true);
      }
    } catch (error) {
      router.replace(`${AppRoutes.TEAM}/${teamNumber}`);
    }
  }

  useEffect(() => {
    getEventData();
  }, [teamNumber, eventId, id]);

  const eventSelected = (event: IBlueAllianceEventSimple) => {
    if (event.key === "") return;
    setValid(true); //set valid if we don't have empty string
    setEventID(String(event.key)); //Update eventID
    setEventName(`${String(event.name)} (${String(event.year)})`);
  };

  const validateColumns = useCallback(() => {
    for (const item of columns) {
      if (item.label === "" || item.value === "") {
        setValid(false);
        return;
      }
    }
    setValid(columns.length > 0);
  }, [columns]);

  function stepUpdated(stepNumber: number) {
    if (stepNumber === 0) {
      setValid(eventID !== "");
    } else if (stepNumber === 1) {
      validateColumns();
    }
  }
  async function finish() {
    if (eventID === "") return;
    const data = {
      id,
      eventId,
      eventID,
      eventName,
      columns,
      teamNumber,
    };

    await api.put("/api/justscout/event", { json: data }).json();
    router.push(`${AppRoutes.TEAM}/${userInfo?.teamNumber}`);
  }

  return (
    <Fragment>
      <StepperWrapperTemplate
        valid={valid}
        stepLabels={["Event", "Robot", "Review"]}
        componentsArray={[
          <BAEventSelector
            eventList={teamEvents}
            rowClick={eventSelected}
            selectedEventID={eventID}
          />,
          <ColumnEditor
            title="Please enter information about your robot"
            addColumn={() => addColumn(columns, setColumns)}
            columns={columns}
            removeCol={(id) => removeCol(id, columns, setColumns)}
            onChange={(change) => {
              updateColumns(change, columns, setColumns);
              validateColumns();
            }}
          />,
          <ColumnEditor
            title={`This is what you'll share with other teams for ${eventName}`}
            columns={columns}
            readonly
          />,
        ]}
        finish={finish}
        stepUpdate={stepUpdated}
      />
    </Fragment>
  );
}
