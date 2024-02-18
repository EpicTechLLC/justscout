import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";
import Loading from "../../Atom/Loading";
import InputAdornment from "@mui/material/InputAdornment";

export type SignUpTemplateProps = {
  /**Log out Function to call */
  signOut: () => unknown;
  /**submit function to call */
  submit: () => unknown;
  /**Team Number setter */
  setTeamNumber: (e: string) => unknown;
  /**Team Name if any */
  teamName: string;
  /**Are we waiting to load the team info? */
  loading?: boolean;
};

export default function SignUpTemplate({
  signOut,
  submit,
  setTeamNumber,
  teamName,
  loading,
}: SignUpTemplateProps) {
  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Typography variant="h4">Sign up</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography>Enter your team number</Typography>
      </Grid>
      <Grid xs={12}>
        <TextField
          placeholder="Enter Team Number"
          label="Team Number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">FRC: </InputAdornment>
            ),
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTeamNumber(e.target.value)
          }
        />
      </Grid>
      {teamName ? (
        <Grid xs={12}>
          <Typography>
            That is team <b>{teamName}</b>.
          </Typography>
        </Grid>
      ) : null}
      {loading ? <Loading /> : null}

      <Grid xl={1}>
        <Button
          variant="contained"
          disabled={teamName === ""}
          onClick={() => submit()}
        >
          Submit
        </Button>
      </Grid>
      <Grid xl={2}>
        <Button variant="contained" color="error" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Grid>
    </Grid>
  );
}
