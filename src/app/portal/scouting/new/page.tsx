"use client";

import { AppUserContext } from "@/app/Context/AppUserContext";
import DynamicForm from "@/app/components/UI/Molecule/DynamicForm/DynamicForm";
import BAEventSelector from "@/app/components/UI/Organism/BAEventSelector/BAEventSelector";
import DynamicEditor from "@/app/components/UI/Organism/DynamicEditor/DynamicEditor";
import DynamicView from "@/app/components/UI/Organism/DynamicView/DynamicView";
import StepperWrapperTemplate from "@/app/components/UI/Template/StepperWrapperTemplate/StepperWrapperTemplate";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { IBlueAllianceEventSimple } from "@/app/types/IBlueAllianceEventSimple";
import { IColumnProperties } from "@/app/types/IColumnProperties";
import { IRecord } from "@/app/types/IRecord";
import addColumn from "@/app/util/addColumn";
import addDefaultColumns from "@/app/util/addDefaultColumns";
import firebaseRequest from "@/app/util/firebaseRequest";
import removeCol from "@/app/util/removeCol";
import updateColumns from "@/app/util/updateColumns";
import updateRecords from "@/app/util/updateRecords";
import { User } from "firebase/auth";
import ky from "ky";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ScoutingNew() {
  const { user, userInfo, loadingUser } = useContext(AppUserContext);
  const [teamEventsList, setTeamEventsList] = useState<
    IBlueAllianceEventSimple[]
  >([]);
  const [eventID, setEventID] = useState("");
  const [eventName, setEventName] = useState("");
  const [columns, setColumns] = useState<IColumnProperties[]>([]);
  const [exampleRecords, setExampleRecords] = useState<IRecord[]>([]);
  const [valid, setValid] = useState(false);
  const router = useRouter();
  async function getTeamEvents() {
    let result = (await ky
      .get(`/api/blue-alliance/events/${userInfo?.teamNumber}`)
      .json()) as IBlueAllianceEventSimple[];
    setTeamEventsList(result);
  }

  useEffect(() => {
    if (!loadingUser && userInfo?.teamNumber) {
      getTeamEvents();
    }
  }, [loadingUser]);

  useEffect(() => {
    if (0 === columns.length) {
      addDefaultColumns(setColumns);
    }
  }, []);
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
    };
    const api = firebaseRequest(user as User);
    const result = await api
      .post("/api/justscout/scouting", { json: data })
      .json();
    router.push(AppRoutes.SCOUTING);
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
