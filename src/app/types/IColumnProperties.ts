import { DataTypes } from "../enums/DataTypes";

export interface IColumnProperties {
  id: string;
  label: string;
  value: string;
  dataType?: DataTypes;
}
