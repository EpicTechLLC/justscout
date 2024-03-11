import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import Refresh from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";

export type TeamListProps = {
  data: any[];
  columns: any[];
  onRowClick: Function;
  getRankings: Function;
  rankLoad: boolean;
};

export default function TeamList({
  data = [],
  onRowClick,
  getRankings,
  rankLoad,
  columns,
}: TeamListProps) {
  const options: MUIDataTableOptions = {
    filter: true,
    filterType: "textField",
    responsive: "vertical",
    tableBodyHeight: "100%",
    selectableRows: "none",
    print: false,
    download: false,
    expandableRows: false,
    rowHover: true,
    pagination: false,
    sortOrder: { name: "Rank", direction: "asc" },
    onRowClick: (event: any, rowData: any) => {
      const row = data[rowData.dataIndex];
      onRowClick(row);
    },
    customToolbar: () => {
      return (
        <>
          {!rankLoad ? (
            <Tooltip title={"Update Rankings"}>
              <IconButton onClick={() => getRankings()} size="large">
                <Refresh />
              </IconButton>
            </Tooltip>
          ) : (
            <IconButton size="large">
              <CircularProgress color="inherit" size="1.3rem" />
            </IconButton>
          )}
        </>
      );
    },
  };
  return (
    <MUIDataTable
      title={"Teams"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}
