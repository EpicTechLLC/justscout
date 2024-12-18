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
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/teams/${id}`);
        const data: Teams = await res.json();
        setTeams(data);
        let teamsList = [];
        for (let team of data) {
          console.log(team);
          teamsList.push({
            id: team.team_number,
            team_number: team.team_number,
            nickname: team.nickname,
          });
        }
        setTeams(teamsList);
        // const rows: GridRowsProp = [
        //   { id: 1, col1: "Hello", col2: "World" },
        //   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
        //   { id: 3, col1: "MUI", col2: "is Amazing" },
        // ];
      } catch (err) {
        console.error("Failed to fetch team data", err);
      }
    });
  }, [id]);

  const columns: GridColDef[] = [
    { field: "team_number", headerName: "Number", minWidth: 1},
    { field: "nickname", headerName: "Name" },
    // { field: "state_prov", headerName: "Location", width: 150 },
  ];
  console.log(teams);
  return (
    <Box>
      <Box
        display="inline-flex"
        flexWrap="wrap" // Allows buttons to wrap to a new line
        gap={0} // Adds spacing between buttons
        pb={2}
      >
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
          <DataGrid rows={teams} columns={columns} />
        )}
      </Box>
    </Box>
  );
}
