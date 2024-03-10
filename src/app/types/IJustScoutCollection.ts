import { IColumnProperties } from "./IColumnProperties";
import { IRecord } from "./IRecord";
import { IRecords } from "./IRecords";

export interface IJustScoutCollection {
  columns: IColumnProperties[];
  records: IRecords;
}
