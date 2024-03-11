import MUIDataTable from "mui-datatables";

export type MemberListProps = {
  /**List of member */
  members: string[][];
  /**Function when row is clicked */
  rowClick: (event: string[]) => void;
};
/**Displays List of Current Members */
export default function MemberList({ members, rowClick }: MemberListProps) {
  return (
    <MUIDataTable
      title={"Members"}
      data={members}
      columns={["Name", "Role"]}
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
          const row = members[rowData.dataIndex];
          rowClick(row);
        },
      }}
    />
  );
}
