import { ISharedEventInfo } from "@/app/types/ISharedEventInfo";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ReactTimeAgo from "react-time-ago";
import ColumnEditor from "../../Organism/ColumnEditor/ColumnEditor";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export interface EventInfoDisplayTemplateProps extends ISharedEventInfo {
  navigateToEdit: () => void;
  handleDeleteClick: () => void;
  openShareModalOpen: () => void;
  isCreator: boolean;
}

export default function EventInfoDisplayTemplate({
  name,
  modified,
  modifiedByName,
  columns,
  isCreator = false,
  openShareModalOpen,
  navigateToEdit,
  handleDeleteClick,
}: EventInfoDisplayTemplateProps) {
  return (
    <Card variant="outlined" elevation={24}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">{name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Last updated <ReactTimeAgo date={new Date(Number(modified))} />{" "}
              by: {modifiedByName}
            </Typography>
          </Grid>
          {isCreator ? (
            <Grid item>
              <Button
                color="error"
                variant="contained"
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </Grid>
          ) : null}
          {isCreator ? (
            <Grid item>
              <Button variant="contained" onClick={navigateToEdit}>
                Edit
              </Button>
            </Grid>
          ) : null}
          <Grid item>
            <Button variant="contained" onClick={openShareModalOpen}>
              Share
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ColumnEditor title="" columns={columns} readonly />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
