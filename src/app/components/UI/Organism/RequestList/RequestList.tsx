import MUIDataTable from "mui-datatables";

export type RequestListProps = {
  /**List of requesting members */
  requests: string[][];
  /**Function when row is clicked */
  rowClick: (event: string[]) => void;
};
/**Displays List of Current requesting members */
export default function RequestList({ requests, rowClick }: RequestListProps) {
  return (
    <MUIDataTable
      title={"Requests"}
      data={requests}
      columns={["Name"]}
      options={{
        filter: false,
        selectableRows: "none",
        print: false,
        download: false,
        expandableRows: false,
        rowHover: true,
        pagination: false,
        sortOrder: { name: "Name", direction: "asc" },
        onRowClick: (event: any, rowData: any) => {
          const row = requests[rowData.dataIndex];
          rowClick(row);
        },
      }}
    />
  );
}
