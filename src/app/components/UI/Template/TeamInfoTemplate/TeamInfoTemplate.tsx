import { ITeam } from "@/app/types/ITeam";
import getLocation from "@/app/util/getLocation";
import { West } from "@mui/icons-material";
import { Grid, Link, Typography } from "@mui/material";
import Card from "@mui/material/Card";

export interface TeamInfoTemplateProps extends ITeam {}

export default function TeamInfoTemplate({
  teamNumber,
  nameFull,
  nameShort,
  city,
  stateProv,
  country,
  rookieYear,
  robotName,
  districtCode,
  schoolName,
  website,
}: TeamInfoTemplateProps) {
  const firstWebsite = `https://frc-events.firstinspires.org/team/${teamNumber}`;
  const localWebsite = website === "" ? firstWebsite : website;
  return (
    <Card>
      <Grid
        container
        justifyContent="center"
        textAlign="center"
        spacing={2}
        pb={4}
      >
        <Grid item xs={12}>
          <Typography variant="h3" component="h1">
            Team Information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" component="h2">
            {teamNumber}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h3" fontWeight="bold">
            {nameShort}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" component="h3">
            From: {getLocation(city, stateProv, country)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" component="h3">
            {nameFull}
          </Typography>
        </Grid>
        {robotName !== "" ? (
          <Grid item xs={12}>
            <Typography variant="body1" component="h3">
              Robot Name: {robotName}
            </Typography>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Typography variant="body1" component="h3">
            Rookie Year: {rookieYear}
          </Typography>
        </Grid>
        {schoolName ? (
          <Grid item xs={12}>
            <Typography variant="body1" component="h3">
              School Name: {schoolName}
            </Typography>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Link href={localWebsite}>Website</Link>
        </Grid>
        <Grid item xs={12}>
          Details on <Link href={firstWebsite}>firstinspires.org</Link>
        </Grid>
      </Grid>
    </Card>
  );
}
