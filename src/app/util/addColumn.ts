import { IColumnProperties } from "../types/IColumnProperties";
import uniqueID from "./uniqueID";

export default function addColumn(
  columns: IColumnProperties[],
  setColumns: (columns: IColumnProperties[]) => void
) {
  const newCol = {
    id: uniqueID(),
    label: "",
    value: "",
  };
  const updated = [newCol, ...columns];
  setColumns(updated);
}
