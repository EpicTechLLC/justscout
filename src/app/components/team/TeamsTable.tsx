import { ITeam } from "@/app/types/ITeam";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Fragment, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import getLocation from "@/app/util/getLocation";
import { AppRoutes } from "@/app/enums/AppRoutes";

export interface TeamsTableProps {
  teamsList: ITeam[];
  userTeam: string;
}

export default function TeamsTable({
  teamsList,
  userTeam = "",
}: TeamsTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [localTeamsList, setLocalTeamList] = useState(teamsList);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (searchTerm === "") {
      setLocalTeamList(teamsList);
    } else {
      setLocalTeamList(
        localTeamsList.filter(
          (team) =>
            team.nameShort.toLowerCase().includes(searchTerm.toLowerCase()) ||
            getLocation(team.city, team.stateProv, team.country)
              .toLowerCase()
              .includes(searchTerm) ||
            String(team.teamNumber).includes(searchTerm)
        )
      );
    }
  }, [searchTerm]);
  return (
    <Fragment>
      <Grid container spacing={2} pb={2}>
        <Grid item xs={8} md={10}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        {userTeam !== "" ? (
          <Grid item xs={3} md={2} textAlign="right">
            <Button
              variant="contained"
              onClick={() => router.push(`${AppRoutes.TEAM}/${userTeam}`)}
            >
              My Team
            </Button>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ mb: 6 }}>
            <TablePagination
              component="div"
              count={teamsList.length}
              page={page}
              onPageChange={(e, p) => setPage(p)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) =>
                setRowsPerPage(Number(e.target.value))
              }
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">#</TableCell>
                  <TableCell>Team Name</TableCell>
                  <TableCell align="right">Team Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {localTeamsList.map((row, i) => {
                  if (i >= rowsPerPage * page && i < rowsPerPage * (page + 1)) {
                    return (
                      <TableRow
                        key={row.teamNumber}
                        sx={{
                          background:
                            i % 2 == 0
                              ? (theme) => theme.palette.action.hover
                              : null,
                        }}
                        onClick={() =>
                          router.push(`${AppRoutes.TEAM}/${row.teamNumber}`)
                        }
                      >
                        <TableCell align="right">{row.teamNumber}</TableCell>
                        <TableCell component="th" scope="row">
                          {row.nameShort}
                        </TableCell>
                        <TableCell align="right">
                          {getLocation(row.city, row.stateProv, row.country)}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Fragment>
  );
}
