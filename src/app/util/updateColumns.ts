import { IColumnProperties } from "../types/IColumnProperties";

export default function updateColumns(
  column: IColumnProperties,
  columns: IColumnProperties[],
  setColumns: (columns: IColumnProperties[]) => void
) {
  const newColumns = [];

  for (const item of columns) {
    if (item.id === column.id) {
      newColumns.push(column);
    } else {
      newColumns.push(item);
    }
  }
  setColumns(newColumns);
}
