"use client";
import EventInfoDisplayTemplate from "@/app/components/UI/Template/EventInfoDisplayTemplate/EventInfoDisplayTemplate";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { ISharedEventInfo } from "@/app/types/ISharedEventInfo";
import firebaseRequest from "@/app/util/firebaseRequest";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { getAuth } from "firebase/auth";
import ky from "ky";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function EventView({
  params,
}: {
  params: { teamNumber: string; eventId: string; id: string };
}) {
  const { teamNumber, eventId, id } = params;
  const [user] = useAuthState(getAuth());
  const [eventData, setEventData] = useState<ISharedEventInfo>();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();
  async function getEventData() {
    try {
      const sharedEvent = (await ky
        .get(`/api/justscout/${teamNumber}/event/${eventId}/${id}`)
        .json()) as ISharedEventInfo;
      if (sharedEvent) {
        setEventData(sharedEvent);
      }
    } catch (error) {
      router.push(`${AppRoutes.TEAM}/${teamNumber}`);
    }
  }
  useEffect(() => {
    getEventData();
  }, []);

  function navEdit() {
    router.push(
      `${AppRoutes.TEAM_PORTAL_EDIT}?teamNumber=${teamNumber}&eventId=${eventId}&id=${id}`
    );
  }

  async function handleDeletion() {
    if (!user || user === null) {
      return;
    }
    const api = firebaseRequest(user);
    try {
      await api.delete(`/api/justscout/event`, {
        json: {
          teamNumber,
          eventId,
          id,
        },
      });
      router.back();
    } catch {}
  }

  return (
    <Fragment>
      {eventData ? (
        <EventInfoDisplayTemplate
          navigateToEdit={navEdit}
          handleDeleteClick={() => setIsDeleteModalOpen(true)}
          isCreator={user?.uid === eventData.modifiedBy}
          openShareModalOpen={() => setIsShareModalOpen(true)}
          {...eventData}
        />
      ) : null}

      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle>Are you user you want to delete this event?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeletion} color="error" variant="contained">
            Yes
          </Button>

          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            variant="contained"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
