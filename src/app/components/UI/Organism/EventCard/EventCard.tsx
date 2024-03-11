import { IEventInfo } from "@/app/types/IEventInfo";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Button,
} from "@mui/material";

export interface EventCardProps extends IEventInfo {
  goToEvent: () => void;
}

export default function EventCard({ name, goToEvent }: EventCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {name}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button onClick={goToEvent} size="small">
          View Event
        </Button>
      </CardActions>
    </Card>
  );
}
