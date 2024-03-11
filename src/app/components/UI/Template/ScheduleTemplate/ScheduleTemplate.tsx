import {
  Grid,
  Button,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableHead,
  TableBody,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { IBlueAllianceSchedule } from "@/app/types/IBlueAllainceSchedule";
import DynamicView from "../../Organism/DynamicView/DynamicView";
import { IJustScoutCollection } from "@/app/types/IJustScoutCollection";
import { BlueAllianceSimpleLinks } from "@/app/enums/BlueAllianceSimpleLinks";
import { IRecord } from "@/app/types/IRecord";
import updateRecords from "@/app/util/updateRecords";

const redMatch = { backgroundColor: "#a62d2b", borderBottom: "1% solid #fff" };
const blueMatch = {
  borderBottom: "1% solid #dee2e6",
  backgroundColor: "#0e5e9e",
};

export type ScheduleTemplateProps = {
  rows: IBlueAllianceSchedule[];
  teamNumber: string;
  eventData: IJustScoutCollection;
  updateTeamProps: (record: IRecord[], id: string) => void;
  changeSchedule: () => void;
  scheduleButtonView: string;
};

export default function ScheduleTemplate({
  rows,
  teamNumber,
  eventData,
  updateTeamProps,
  changeSchedule,
  scheduleButtonView,
}: ScheduleTemplateProps) {
  const [dynamicDialog, setDynamicDialog] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<IRecord[]>([]);
  const [currentTeamId, setCurrentTeamID] = useState<string>("");
  const getDate = (value: number) => {
    var date = new Date(value * 1000);
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? " PM" : " AM";
    var min = date.getMinutes() < 10 ? "00" : "" + date.getMinutes();
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      " " +
      hours +
      ":" +
      min +
      am_pm
    );
  };
  const convertMatchType = (value: any) => {
    if (value === "f") {
      //final match
      return "F";
    } else if (value === "sf") {
      //semifinal
      return "SF";
    } else if (value === "qf") {
      //quarter final
      return "QF";
    } else if (value === "qm") {
      //qualificationMatch
      return "Q";
    }
  };
  const boldThisTeam = (teamNum: string | number) => {
    return teamNumber === teamNum;
  };
  const getBumperColor = (alliances: any) => {
    for (var i in [0, 1, 2]) {
      if (alliances.blue.team_keys[i].replace("frc", "") === teamNumber) {
        return blueMatch;
      } else if (alliances.red.team_keys[i].replace("frc", "") === teamNumber) {
        return redMatch;
      }
    }
    return;
  };
  const selectTeam = (team: string) => {
    if (!eventData) {
      return;
    }
    const teamNumberId = eventData.columns.find(
      (col) => col.blueAllianceLink === BlueAllianceSimpleLinks.TEAM_NUMBER
    )?.id;
    if (teamNumberId) {
      for (const recordKey in eventData.records) {
        const record = eventData.records[recordKey];
        const teamNumberIndex = record.findIndex(
          (rec) => rec.id === teamNumberId
        );

        if (record[teamNumberIndex].value === Number(team)) {
          setCurrentTeamID(recordKey);
          setCurrentTeam(record);
          setDynamicDialog(true);
          return;
        }
      }
    }
  };
  const updateTeam = () => {
    updateTeamProps(currentTeam, currentTeamId);
    setCurrentTeam([]);
    setDynamicDialog(false);
  };

  function sortByMatchType(
    rowA: IBlueAllianceSchedule,
    rowB: IBlueAllianceSchedule
  ) {
    if (rowA.actual_time && rowB.actual_time) {
      return rowA.actual_time < rowB.actual_time ? 1 : -1;
    } else {
      return rowA.time < rowB.time ? 1 : -1;
    }
  }
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={() => changeSchedule()}>
            {scheduleButtonView}
          </Button>
        </Box>
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={1} rowSpan={2} align="center">
                  Match #
                </TableCell>
                <TableCell colSpan={1} rowSpan={2} align="center">
                  Date & Time
                </TableCell>
                <TableCell colSpan={3} align="center">
                  Alliance
                </TableCell>
                <TableCell colSpan={1.5} rowSpan={2} align="center">
                  Score
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">3</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.sort(sortByMatchType).map((match) => (
                <React.Fragment key={match.time}>
                  <TableRow>
                    <TableCell
                      rowSpan={2}
                      align="center"
                      style={getBumperColor(match.alliances)}
                    >
                      {convertMatchType(match.comp_level)} {match.match_number}
                    </TableCell>
                    <TableCell rowSpan={2} align="center">
                      {getDate(match.time)}
                    </TableCell>

                    <TableCell
                      rowSpan={1}
                      align="center"
                      sx={{
                        fontSize: boldThisTeam(
                          match.alliances.red.team_keys[0].replace("frc", "")
                        )
                          ? "bold"
                          : "light",
                        ...redMatch,
                      }}
                      onClick={() => {
                        selectTeam(
                          match.alliances.red.team_keys[0].replace("frc", "")
                        );
                      }}
                    >
                      {match.alliances.red.team_keys[0].replace("frc", "")}
                    </TableCell>
                    <TableCell
                      rowSpan={1}
                      align="center"
                      sx={{
                        fontWeight: boldThisTeam(
                          match.alliances.red.team_keys[1].replace("frc", "")
                        )
                          ? "bold"
                          : "light",
                        ...redMatch,
                      }}
                      onClick={() => {
                        selectTeam(
                          match.alliances.red.team_keys[1].replace("frc", "")
                        );
                      }}
                    >
                      {match.alliances.red.team_keys[1].replace("frc", "")}
                    </TableCell>
                    <TableCell
                      rowSpan={1}
                      align="center"
                      sx={{
                        fontWeight: boldThisTeam(
                          match.alliances.red.team_keys[2].replace("frc", "")
                        )
                          ? "bold"
                          : "light",
                        ...redMatch,
                      }}
                      onClick={() => {
                        selectTeam(
                          match.alliances.red.team_keys[2].replace("frc", "")
                        );
                      }}
                    >
                      {match.alliances.red.team_keys[2].replace("frc", "")}
                    </TableCell>

                    <TableCell
                      rowSpan={1}
                      colSpan={1.5}
                      align="center"
                      sx={{
                        fontWeight:
                          match.alliances.red.score > match.alliances.blue.score
                            ? "bold"
                            : "light",
                        ...redMatch,
                        border:
                          match.alliances.red.score > match.alliances.blue.score
                            ? "0.1rem solid white"
                            : null,
                      }}
                    >
                      {match.alliances.red.score}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      rowSpan={1}
                      align="center"
                      sx={{
                        fontWeight: boldThisTeam(
                          match.alliances.blue.team_keys[0].replace("frc", "")
                        )
                          ? "bold"
                          : "light",
                        ...blueMatch,
                      }}
                      onClick={() => {
                        selectTeam(
                          match.alliances.blue.team_keys[0].replace("frc", "")
                        );
                      }}
                    >
                      {match.alliances.blue.team_keys[0].replace("frc", "")}
                    </TableCell>
                    <TableCell
                      rowSpan={1}
                      align="center"
                      sx={{
                        fontWeight: boldThisTeam(
                          match.alliances.blue.team_keys[1].replace("frc", "")
                        )
                          ? "bold"
                          : "light",
                        ...blueMatch,
                      }}
                      onClick={() => {
                        selectTeam(
                          match.alliances.blue.team_keys[1].replace("frc", "")
                        );
                      }}
                    >
                      {match.alliances.blue.team_keys[1].replace("frc", "")}
                    </TableCell>
                    <TableCell
                      rowSpan={1}
                      align="center"
                      sx={{
                        fontWeight: boldThisTeam(
                          match.alliances.blue.team_keys[2].replace("frc", "")
                        )
                          ? "bold"
                          : "light",
                        ...blueMatch,
                      }}
                      onClick={() => {
                        selectTeam(
                          match.alliances.blue.team_keys[2].replace("frc", "")
                        );
                      }}
                    >
                      {match.alliances.blue.team_keys[2].replace("frc", "")}
                    </TableCell>

                    <TableCell
                      rowSpan={1}
                      colSpan={1.5}
                      align="center"
                      sx={{
                        fontWeight:
                          match.alliances.blue.score > match.alliances.red.score
                            ? "bold"
                            : "light",
                        ...blueMatch,
                        border:
                          match.alliances.blue.score > match.alliances.red.score
                            ? "0.1rem solid white"
                            : null,
                      }}
                    >
                      {match.alliances.blue.score}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Dialog
        open={dynamicDialog}
        keepMounted
        onClose={() => {
          setDynamicDialog(false);
        }}
      >
        <DialogTitle>Add Team</DialogTitle>
        <DialogContent>
          <DynamicView
            columns={eventData.columns}
            records={currentTeam}
            onChange={(change) => {
              updateRecords(change, currentTeam, setCurrentTeam);
            }}
            title={"Update Scouting Data"}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setDynamicDialog(false);
            }}
          >
            Close
          </Button>
          <Button variant="contained" onClick={updateTeam}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
