import React, { useEffect, useState, useTransition } from "react";
import { Typography, Grid2 as Grid, Divider, Link } from "@mui/material";
import Loader from "./Loader";
import safeValue from "../../utils/safeValue";

const TeamDetails = ({ teamNumber }: { teamNumber: number }) => {
  const [teamInfo, setTeamInfo] = useState<TeamInfoType>();
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(async () => {
      await fetch(`/api/team/${teamNumber}`)
        .then(async (res) => setTeamInfo((await res.json()) as TeamInfoType))
        .catch((err) => console.error("Failed to fetch team data", err));
    });
  }, [teamNumber]);

  return isPending ? (
    <Loader />
  ) : teamInfo === undefined ? (
    <Typography>No Data Available for {teamNumber}</Typography>
  ) : (
    <Grid container spacing={2} textAlign="center">
      <Grid size={12}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Team #{teamInfo.team_number}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant="h5" fontWeight="bold">
          {safeValue(teamInfo.nickname)}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant="subtitle1" color="text.secondary">
          {safeValue(teamInfo.name)}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant="body2" color="text.secondary">
          <strong>From:</strong> {safeValue(teamInfo.city)},{" "}
          {safeValue(teamInfo.state_prov)}, {safeValue(teamInfo.country)}
        </Typography>
      </Grid>
      {teamInfo.school_name ? (
        <Grid size={12}>
          <Typography variant="body2" color="text.secondary">
            <strong>School:</strong> {safeValue(teamInfo.school_name)}
          </Typography>
        </Grid>
      ) : null}
      {teamInfo.address ? (
        <Grid size={12}>
          <Typography variant="body2" color="text.secondary">
            <strong>Address:</strong> {safeValue(teamInfo.address)}
          </Typography>
        </Grid>
      ) : null}
      {teamInfo.motto ? (
        <Grid size={12}>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            fontStyle="italic"
          >
            {safeValue(teamInfo.motto)}
          </Typography>
        </Grid>
      ) : null}
      {teamInfo.rookie_year ? (
        <Grid size={12}>
          <Typography variant="body2">
            <strong>Rookie Year:</strong> {safeValue(teamInfo.rookie_year)}
          </Typography>
        </Grid>
      ) : null}
      {teamInfo.website ? (
        <Grid size={12}>
          <Link
            href={safeValue(teamInfo.website) !== "-" ? teamInfo.website : "#"}
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            {safeValue(teamInfo.website) !== "-" ? "Visit Team Website" : "-"}
          </Link>
        </Grid>
      ) : null}
      <Grid size={12}>
        <Divider />
        <Typography variant="caption">
          Powered By{" "}
          <Link href={"https://www.thebluealliance.com/"}>
            The Blue Alliance
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TeamDetails;
