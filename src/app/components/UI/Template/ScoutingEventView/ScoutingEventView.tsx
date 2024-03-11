import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EditIcon from "@mui/icons-material/Edit";
import { IPermission } from "@/app/types/IPermission";
import { useEffect, useState } from "react";
import TeamList from "../../Organism/TeamList/TeamList";
import { IRecord } from "@/app/types/IRecord";
import DynamicView from "../../Organism/DynamicView/DynamicView";
import updateRecords from "@/app/util/updateRecords";

export type ScoutingEventViewProps = {
  permissions: IPermission;
  name: string;
  columns: any;
  updateTeamProp: (record: IRecord[], id: string) => void;
  rankLoad: boolean;
  updateRanking: () => void;
  recordsProp: { [key: string]: IRecord[] };
  recordListProp: any[];
  navigateEdit: () => void;
  navigateSchedule: () => void;
};

export default function ScoutingEventView({
  permissions,
  name,
  columns,
  updateTeamProp,
  rankLoad,
  updateRanking,
  recordsProp,
  recordListProp,
  navigateEdit,
  navigateSchedule,
}: ScoutingEventViewProps) {
  const [dynamicDialog, setDynamicDialog] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<IRecord[]>([]);
  const [currentTeamId, setCurrentTeamID] = useState<string>("");
  const [records, setRecords] = useState<any>({});
  const [recordList, setRecordList] = useState<any[]>([]);
  const [oldRecord, setOldRecord] = useState<IRecord[]>([]);
  useEffect(() => {
    setRecordList(recordListProp);
    setRecords(recordsProp);
  }, [recordsProp, recordListProp]);
  const displayRow = (row: string[]) => {
    setCurrentTeamID(row[3]);
    const rec = records[row[3]];
    setCurrentTeam(rec);
    setOldRecord(Object.assign({}, rec));
    setDynamicDialog(true);
  };
  const updateTeam = () => {
    updateTeamProp(currentTeam, currentTeamId);
    setCurrentTeam([]);
    setOldRecord([]);
    setDynamicDialog(false);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
        <Typography variant="h4">{name}</Typography>
      </Grid>
      <Grid item xl={1} lg={1} md={1} sm={2} xs={3}>
        <Button variant="contained" onClick={navigateSchedule}>
          <ScheduleIcon />
        </Button>
      </Grid>
      {permissions.Update ? ( //Can user Update this event?
        <Grid item xl={1} lg={1} md={1} sm={2} xs={3}>
          <Button variant="contained" onClick={navigateEdit}>
            &nbsp; <EditIcon />
          </Button>
        </Grid>
      ) : null}

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <TeamList
          onRowClick={(row: string[]) => displayRow(row)}
          data={recordList}
          rankLoad={rankLoad}
          columns={["Rank", "Team Number", "Team Name"]}
          getRankings={updateRanking}
        />
      </Grid>
      <Dialog
        open={dynamicDialog}
        keepMounted
        onClose={() => {
          setDynamicDialog(false);
        }}
      >
        <DialogContent>
          <DynamicView
            columns={columns}
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
              setCurrentTeam([]);
              setDynamicDialog(false);
            }}
          >
            Close
          </Button>
          <Button variant="contained" onClick={() => updateTeam()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
