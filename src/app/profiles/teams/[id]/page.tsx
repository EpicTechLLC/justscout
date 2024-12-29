"use client";
import { Box, Button } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { JustScoutRoutes } from "../../../types/Routes";

type TeamDataType = {
  id: number;
  team_number: number;
  nickname: string;
  location: string;
};

export default function Teams() {
  const router = useRouter();
  const params = useParams();
  const id = params.id ? parseInt(params.id as string) : 0;
  const [isPending, startTransition] = useTransition();
  const [teams, setTeams] = useState<TeamDataType[]>([]);
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
          } as TeamDataType);
        }
        setTeams(teamsList);
      } catch (err) {
        console.error("Failed to fetch team data", err);
      }
    });
  }, [id]);

  const columns = useMemo<MRT_ColumnDef<TeamDataType>[]>(
    () => [
      { accessorKey: "team_number", header: "#", size: 4, grow: true },
      { accessorKey: "nickname", header: "Name" },
      { accessorKey: "location", header: "Location", grow: true },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: teams, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiTableContainerProps: { sx: { width: "100vw" } },
    state: { isLoading: isPending },
    initialState: { pagination: { pageSize: 100, pageIndex: 0 } },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        startTransition(() =>
          router.push(
            `${JustScoutRoutes.profiles.subpaths.team.path}/${
              teams[row.index].id
            }/${new Date().getFullYear()}`
          )
        );
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
  });
  return (
    <Box>
      <Box display="inline-flex" flexWrap="wrap" gap={0} pb={2}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((thisID) => (
          <Button
            key={thisID}
            variant={id === thisID ? "contained" : "outlined"}
            onClick={() =>
              router.push(
                `${JustScoutRoutes.profiles.subpaths.teams.path}/${thisID}`
              )
            }
            size="medium"
          >
            {thisID === 0 ? "1-999" : `${thisID}000's`}
          </Button>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" width="auto">
        <MaterialReactTable table={table} />
      </Box>
    </Box>
  );
}
