import { BlueAllianceLinks } from "../enums/BlueAllianceLinks";
import { DataTypes } from "../enums/DataTypes";
import { IColumnProperties } from "../types/IColumnProperties";
import uniqueID from "./uniqueID";

const defaultColumns: IColumnProperties[] = [
  {
    id: uniqueID(),
    label: "Team Number",
    value: "",
    dataType: DataTypes.NUMBER,
    blueAllianceLink: BlueAllianceLinks.TEAM_NUMBER,
    readOnly: true,
  },
  {
    id: uniqueID(),
    label: "Team Name",
    value: "",
    dataType: DataTypes.TEXT,
    blueAllianceLink: BlueAllianceLinks.NAME,
    readOnly: true,
  },
];

export default function addDefaultColumns(
  setColumns: (columns: IColumnProperties[]) => void
) {
  setColumns(defaultColumns);
}
