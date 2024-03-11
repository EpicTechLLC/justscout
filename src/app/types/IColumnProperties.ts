import { BlueAllianceAdvLinks } from "../enums/BlueAllianceAdvLinks";
import { BlueAllianceSimpleLinks } from "../enums/BlueAllianceSimpleLinks";
import { DataTypes } from "../enums/DataTypes";

export interface IColumnProperties {
  id: string;
  label: string;
  value: string | number | boolean;
  dataType?: DataTypes;
  blueAllianceLink?: BlueAllianceSimpleLinks | BlueAllianceAdvLinks;
  readOnly?: boolean;
}
