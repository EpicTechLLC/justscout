import { BlueAllianceAdvLinks } from "../enums/BlueAllianceAdvLinks";
import { BlueAllianceSimpleLinks } from "../enums/BlueAllianceSimpleLinks";
import { DataTypes } from "../enums/DataTypes";

export interface IColumnProperties {
  id: string;
  label: string;
  value: unknown;
  dataType?: DataTypes;
  blueAllianceLink?: BlueAllianceSimpleLinks | BlueAllianceAdvLinks;
  readOnly?: boolean;
}
