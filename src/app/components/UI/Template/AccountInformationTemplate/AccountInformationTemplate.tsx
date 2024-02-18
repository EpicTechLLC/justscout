import { IUserInfo } from "@/app/types/IUserInfo";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export interface AccountInformationTemplate extends IUserInfo {
  signOut: () => void;
}

export default function AccountInformationTemplate({
  displayName,
  teamNumber,
  signOut,
}: AccountInformationTemplate) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h1">
          Account Information
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Name: <b>{displayName}</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Team Number <b>{teamNumber}</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button color="error" variant="contained" onClick={signOut}>
          Sign Out
        </Button>
      </Grid>
    </Grid>
  );
}
