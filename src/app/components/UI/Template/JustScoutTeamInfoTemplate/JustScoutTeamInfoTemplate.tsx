import { AppRoutes } from "@/app/enums/AppRoutes";
import { IEventInfo } from "@/app/types/IEventInfo";
import { Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReactTimeAgo from "react-time-ago";

export interface JustScoutTeamInfoTemplateProps {
  events: IEventInfo[];
  isTeamMember: boolean;
  redirectEvent: (event: IEventInfo) => void;
  redirectAdd: () => void;
}

export default function JustScoutTeamInfoTemplate({
  events,
  isTeamMember = false,
  redirectEvent,
  redirectAdd,
}: JustScoutTeamInfoTemplateProps) {
  return (
    <Grid container spacing={4} pt={4} justifyContent="center">
      <Grid item xs={12} m={2}>
        <Typography variant="h4" textAlign="center">
          Just Scout Team Events
        </Typography>
      </Grid>
      {isTeamMember ? (
        <Grid item xs={12} textAlign="center">
          <Button variant="contained" onClick={redirectAdd}>
            Add Event
          </Button>
        </Grid>
      ) : null}
      <Grid item xs={6}>
        {events.length === 0 ? (
          <Typography variant="h6" textAlign="center">
            No Events Yet
          </Typography>
        ) : (
          <Stack spacing={2}>
            {events.map((event, index) => (
              <Paper
                key={index}
                sx={{
                  padding: 1,
                  textAlign: "center",
                  borderRadius: 4,
                }}
                onClick={() => redirectEvent(event)}
              >
                <Typography variant="h5">{event.name}</Typography>
                <Typography>
                  Modified By: {event.modifiedByName}{" "}
                  <ReactTimeAgo date={event.modified} />
                </Typography>
              </Paper>
            ))}
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}
