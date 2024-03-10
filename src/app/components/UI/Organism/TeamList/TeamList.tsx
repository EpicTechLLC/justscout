import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";

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
      var row = data[rowData.dataIndex];
      onRowClick(row);
    },
    // customToolbar: () => {
    //   return (
    //     <TeamListToolbar
    //       getRankings={() => getRankings()}
    //       addNew={() => addNew()}
    //       rankLoad={rankLoad}
    //     />
    //   );
    // },
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
