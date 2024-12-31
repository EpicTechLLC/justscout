import React, { useEffect, useState, useTransition } from "react";
import { Typography, Grid2 as Grid, Divider, Link } from "@mui/material";
import Loader from "./Loader";

const TeamStatsRender = ({ id, year }: { id: number; year: number }) => {
  const [data, setData] = useState<TeamStatsType>();
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (id && year) {
      startTransition(async () => {
        await fetch(`https://api.statbotics.io/v3/team_year/${id}/${year}`)
          .then(async (res) => {
            setData((await res.json()) as TeamStatsType);
          })
          .catch((err) => console.error("Failed to fetch team data", err));
      });
    }
  }, [id, year]);

  const rankRender = (name: string | undefined, rank: Rank | undefined) => {
    if (name !== null && name !== undefined && rank !== undefined) {
      return (
        <Grid size={4}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            <strong>{rank.rank}</strong>
            <br /> {name} <br />
            of {rank.team_count}
          </Typography>
        </Grid>
      );
    }
  };
  return isPending ? (
    <Loader />
  ) : data && Object.keys(data).length === 0 ? (
    <Typography>No Stats Available for {year}</Typography>
  ) : (
    <Grid container textAlign="center">
      <Grid size={12}>
        <Typography variant="h6">EPA Statistics</Typography>
      </Grid>
      {data?.epa?.breakdown?.auto_points?.mean ? (
        <Grid size={4} mt={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>Auto</strong>:<br />
            {data?.epa.breakdown.auto_points.mean}
          </Typography>
        </Grid>
      ) : null}
      {data?.epa?.breakdown?.teleop_points?.mean ? (
        <Grid size={4} mt={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>Teleop</strong>:<br />{" "}
            {data?.epa.breakdown.teleop_points.mean}
          </Typography>
        </Grid>
      ) : null}
      {data?.epa?.breakdown?.endgame_points?.mean ? (
        <Grid size={4} mt={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>Endgame</strong>:<br />{" "}
            {data?.epa.breakdown.endgame_points.mean}
          </Typography>
        </Grid>
      ) : null}
      <Grid size={12}>
        <Divider />
        <Typography variant="h6">Rankings</Typography>
      </Grid>
      {rankRender("Worldwide", data?.epa.ranks.total)}
      {rankRender(data?.country, data?.epa.ranks.country)}
      {rankRender(data?.state, data?.epa.ranks.state)}
      <Grid size={12}>
        <Divider />
        <Typography variant="h6">
          Record
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant="body2" color="text.secondary">
          <strong>Season Record:</strong> <br />
          {data?.record.season.wins}-{data?.record.season.losses}-
          {data?.record.season.ties}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Divider />
        <Typography variant="caption">
          Powered By <Link href={"https://www.statbotics.io/"}>Statbotics</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TeamStatsRender;
