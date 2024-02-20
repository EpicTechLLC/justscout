import { IColumnProperties } from "./IColumnProperties";

export interface ISharedEventInfo {
  name: string;
  columns: IColumnProperties[];
  createdBy: string;
  modifiedBy: string;
  modifiedByName: string;
  timeStamp: number;
  modified: number;
}
