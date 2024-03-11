import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Key } from "react";
import { IPermission } from "@/app/types/IPermission";
import EventCard from "../../Organism/EventCard/EventCard";
import { IEventInfo } from "@/app/types/IEventInfo";
import { Typography } from "@mui/material";

export type ScoutingDashboardProps = {
  permissions: IPermission;
  eventList: IEventInfo[];
  navigateEvent: (event: IEventInfo) => void;
  navigateNew: () => void;
};

export default function ScoutingDashboard({
  permissions,
  eventList,
  navigateEvent,
  navigateNew,
}: ScoutingDashboardProps) {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xl={0} lg={0} md={9} sm={7} xs={6} />
      {permissions.Create ? ( //Create permission
        <Grid item xl={3} lg={3} md={2} sm={3} xs={6}>
          <Button onClick={navigateNew}>
            Add Event &nbsp;
            <AddCircleOutlineIcon />
          </Button>
        </Grid>
      ) : null}
      <Grid item container spacing={3} xl={12} lg={12} md={12} sm={12} xs={12}>
        {eventList?.length === 0 ? (
          <Typography>There are no scouting events yet</Typography>
        ) : (
          eventList?.map((event: any, index: Key | null | undefined) => (
            <Grid key={index} item xl={4} lg={4} md={4} sm={12} xs={12}>
              <EventCard {...event} goToEvent={() => navigateEvent(event)} />
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
}
