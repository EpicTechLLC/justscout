import { IColumnProperties } from "./IColumnProperties";
import { IRecord } from "./IRecord";

export interface IJustScoutCollection {
  columns: IColumnProperties[];
  records: { [key: string]: IRecord[] };
}
