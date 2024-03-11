import { DataTypes } from "../enums/DataTypes";
import { IColumnProperties } from "../types/IColumnProperties";
import uniqueID from "./uniqueID";

export default function addColumn(
  columns: IColumnProperties[],
  setColumns: (columns: IColumnProperties[]) => void
) {
  const newCol: IColumnProperties = {
    id: uniqueID(),
    label: "",
    value: "",
    dataType: DataTypes.TEXT,
    blueAllianceLink: undefined,
  };
  const updated = [newCol, ...columns];
  setColumns(updated);
}
