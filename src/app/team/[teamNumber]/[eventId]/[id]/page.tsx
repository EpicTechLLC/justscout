"use client";

import EventInfoDisplayTemplate from "@/app/components/UI/Template/EventInfoDisplayTemplate/EventInfoDisplayTemplate";
import { ISharedEventInfo } from "@/app/types/ISharedEventInfo";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import ky from "ky";
import { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactTimeAgo from "react-time-ago";

export default function EventView({
  params,
}: {
  params: { teamNumber: string; eventId: string; id: string };
}) {
  const { teamNumber, eventId, id } = params;
  const [user] = useAuthState(getAuth());
  const [eventData, setEventData] = useState<ISharedEventInfo>();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  async function getEventData() {
    const sharedEvent = (await ky
      .get(`/api/justscout/${teamNumber}/event/${eventId}/${id}`)
      .json()) as ISharedEventInfo;
    if (sharedEvent) {
      setEventData(sharedEvent);
      //   const events: ISharedEventInfo[] = [];
      //   for (const key of Object.keys(justScoutTeamInfo)) {
      //     events.push(justScoutTeamInfo[key] as IEventInfo);
      //   }
      //   setEvents(events);
    }
  }
  useEffect(() => {
    getEventData();
  }, []);

  return (
    <Fragment>
      {eventData ? (
        <EventInfoDisplayTemplate
          navigateToEdit={function (): void {
            throw new Error("Function not implemented.");
          }}
          handleDeleteClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          isCreator={user?.uid === eventData.modifiedBy}
          openShareModalOpen={() => setIsShareModalOpen(true)}
          {...eventData}
        />
      ) : null}
    </Fragment>
  );
}
