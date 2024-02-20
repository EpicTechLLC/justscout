import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loading from "../../Atom/Loading";
import { IBlueAllianceEventSimple } from "@/app/types/IBlueAllianceEventSimple";
import { BAEventType } from "@/app/enums/BAEventType";

export interface BAEventSelectorProps {
  eventList: IBlueAllianceEventSimple[];
  rowClick: (event: IBlueAllianceEventSimple) => void;
  selectedEventID: string;
}

export default function BAEventSelector({
  eventList,
  rowClick,
  selectedEventID,
}: BAEventSelectorProps) {
  return (
    <TableContainer
    // sx={{ maxHeight: "90vh" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventList.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                style={{ width: "100%", textAlign: "center" }}
              >
                <Loading />
              </TableCell>
            </TableRow>
          ) : null}

          {eventList.length !== 0 &&
            eventList
              .sort((eventA, eventB) => (eventA.year > eventB.year ? -1 : 1))
              .map((event, index) => (
                <TableRow
                  key={index}
                  sx={{
                    background: (theme) => {
                      if (event.key === selectedEventID) {
                        return theme.palette.primary.main;
                      }
                      if (index % 2 === 0) {
                        return theme.palette.action.hover;
                      }
                    },
                    //   event.eventId === selectedEventID
                    //     ? (theme) => theme.palette.primary.main
                    //     : index % 2 == 0
                    //     ? (theme) => theme.palette.action.hover
                    //     : null,
                  }}
                  onClick={() => rowClick(event)}
                >
                  <TableCell style={{ overflowWrap: "break-word" }}>
                    {event.name}
                  </TableCell>
                  <TableCell style={{ overflowWrap: "break-word" }}>
                    {BAEventType[event.event_type] as string}
                  </TableCell>
                  <TableCell style={{ overflowWrap: "break-word" }}>
                    {event.year}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
