import { BlueAllianceAdvLinks } from "../enums/BlueAllianceAdvLinks";
import { BlueAllianceSimpleLinks } from "../enums/BlueAllianceSimpleLinks";
import { DataTypes } from "../enums/DataTypes";
import { IColumnProperties } from "../types/IColumnProperties";
import uniqueID from "./uniqueID";

const defaultColumns: IColumnProperties[] = [
  {
    id: uniqueID(),
    label: "Team Number",
    value: "",
    dataType: DataTypes.NUMBER,
    blueAllianceLink: BlueAllianceSimpleLinks.TEAM_NUMBER,
    readOnly: true,
  },
  {
    id: uniqueID(),
    label: "Team Name",
    value: "",
    dataType: DataTypes.TEXT,
    blueAllianceLink: BlueAllianceSimpleLinks.NAME,
    readOnly: true,
  },
  {
    id: uniqueID(),
    label: "Rank",
    value: "",
    dataType: DataTypes.NUMBER,
    blueAllianceLink: BlueAllianceAdvLinks.RANK,
    readOnly: true,
  },
];

export default function addDefaultColumns(
  setColumns: (columns: IColumnProperties[]) => void
) {
  setColumns(defaultColumns);
}
