import { BlueAllianceLinks } from "../enums/BlueAllianceLinks";
import { DataTypes } from "../enums/DataTypes";

export interface IColumnProperties {
  id: string;
  label: string;
  value: unknown;
  dataType?: DataTypes;
  blueAllianceLink?: BlueAllianceLinks;
  readOnly?: boolean;
}
