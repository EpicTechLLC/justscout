"use client";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid2 as Grid,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function Teams() {
  const router = useRouter();
  const params = useParams();
  const id = params.id ? parseInt(params.id as string) : 0;
  const [isPending, startTransition] = useTransition();
  const [teams, setTeams] = useState<GridRowsProp>([]);
  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/teams/${id}`);
        const data: Teams = await res.json();
        let teamsList = [];
        for (let team of data) {
          teamsList.push({
            id: team.team_number,
            team_number: team.team_number,
            nickname: team.nickname,
            location:
              team.city && team.state_prov && team?.country
                ? `${team.city} ${team?.state_prov}, ${team?.country}`
                : "-",
          });
        }
        setTeams(teamsList);
      } catch (err) {
        console.error("Failed to fetch team data", err);
      }
    });
  }, [id]);

  const columns: GridColDef[] = [
    { field: "team_number", headerName: "Number", flex: 1 },
    { field: "nickname", headerName: "Name", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
  ];
  return (
    <Box>
      <Box display="inline-flex" flexWrap="wrap" gap={0} pb={2}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((thisID) => (
          <Button
            key={thisID}
            variant={id === thisID ? "contained" : "outlined"}
            onClick={() => router.push(`/teams/${thisID}`)}
            size="medium"
          >
            {thisID === 0 ? "1-999" : `${thisID}000's`}
          </Button>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" width="auto">
        {isPending ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={teams}
            columns={columns}
            onRowClick={(params) => router.push(`/team/${params.id}`)}
          />
        )}
      </Box>
    </Box>
  );
}
