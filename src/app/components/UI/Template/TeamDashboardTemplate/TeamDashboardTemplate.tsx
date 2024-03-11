import { IPermission } from "@/app/types/IPermission";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import TabPanel from "../../Atom/TabPanel/TabPanel";
import MemberList from "../../Organism/MemberList/MemberList";
import { PermissionTypes } from "@/app/enums/PermissionTypes";
import RequestList from "../../Organism/RequestList/RequestList";

export type TeamDashboardProps = {
  /**List of current team members */
  teamMembers: string[][];
  /**User Permissions */
  userPermissions: IPermission;
  /**Function to handle updating roles */
  handleRoleUpdate: (uid: string, role: PermissionTypes) => void;
  /**Requests list */
  requests: string[][];
  /**Handle rejecting  */
  handleRejection: Function;
};
/**Displays a list of current team members and member requests */
export default function TeamDashboardTemplate({
  teamMembers,
  userPermissions,
  handleRoleUpdate,
  requests,
  handleRejection,
}: TeamDashboardProps) {
  /**Tab Value */
  const [value, setTabValue] = useState(0);
  /**Member Dialog */
  const [memberDialog, setMemberDialog] = useState(false);
  /**Request Dialog */
  const [requestDialog, setRequestDialog] = useState(false);
  /**state to hold role selected by user to add member from request */
  const [role, setRole] = useState<PermissionTypes | undefined>();
  const [uid, setUid] = useState<string>("");
  /**member name placeholder */
  const [member, setMember] = useState(""); // new member name
  /**member email placeholder */
  const [memberEmail, setMemberEmail] = useState(""); // new member email

  const memberRowClick = (event: string[]) => {
    if (userPermissions.Update === true) {
      // && event[1] !== PermissionTypes.ADMIN) {
      setMemberDialog(true);
      setRole(event[1] as PermissionTypes);
      setMember(event[0]);
      setUid(event[2]);
    }
  };
  const requestRowClick = (event: string[]) => {
    if (userPermissions.Update === true) {
      // && event[1] !== PermissionTypes.ADMIN) {
      setRequestDialog(true);
      setRole(PermissionTypes.MEMBER);
      setMember(event[0]);
      setUid(event[1]);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Tabs
          value={value}
          onChange={(_, value) => {
            setTabValue(value);
          }}
        >
          <Tab label="Team Members" />
          <Tab disabled={!userPermissions.Read} label="Team Requests" />
        </Tabs>
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <TabPanel value={value} index={0}>
          <MemberList members={teamMembers} rowClick={memberRowClick} />
          <Dialog
            fullWidth={false}
            open={memberDialog}
            onClose={() => {
              setMemberDialog(false);
            }}
            scroll={"paper"}
          >
            <DialogTitle>Change User's Role?</DialogTitle>
            <DialogContent dividers={true}>
              <DialogContentText>
                You can set the role for this User.
              </DialogContentText>
              <Typography variant="subtitle1" align="left">
                Set Role as:
              </Typography>
              <FormControl>
                <Select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value as PermissionTypes);
                  }}
                >
                  {Object.values(PermissionTypes).map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setMemberDialog(false);
                  handleRejection(uid);
                }}
                color="error"
                sx={{ pr: "2rem" }}
              >
                Remove
              </Button>
              <Button
                onClick={() => {
                  setMemberDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleRoleUpdate(uid, role as PermissionTypes);
                  setMemberDialog(false);
                }}
                color="secondary"
              >
                Change
              </Button>
            </DialogActions>
          </Dialog>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RequestList requests={requests} rowClick={requestRowClick} />
          <Dialog
            fullWidth={false}
            open={requestDialog}
            onClose={() => {
              setRequestDialog(false);
            }}
            scroll={"paper"}
          >
            <DialogTitle>Add User to Team?</DialogTitle>
            <DialogContent dividers={true}>
              <DialogContentText>
                You can set the role for this User.
              </DialogContentText>
              <Typography variant="subtitle1" align="left">
                Add {member} as:
              </Typography>
              <FormControl>
                <Select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value as PermissionTypes);
                  }}
                >
                  {Object.values(PermissionTypes).map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setRequestDialog(false);
                  handleRejection(uid);
                }}
              >
                Reject
              </Button>
              <Button
                onClick={() => {
                  handleRoleUpdate(uid, role as PermissionTypes);
                  setRequestDialog(false);
                }}
                color="secondary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </TabPanel>
      </Grid>
    </Grid>
  );
}
