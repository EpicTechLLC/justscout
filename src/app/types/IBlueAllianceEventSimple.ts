import { BAEventType } from "../enums/BAEventType";

export interface IBlueAllianceEventSimple {
  name: string;
  event_type: BAEventType;
  year: number;
  key: string;
  start_date: string;
  end_date: string;
  location_name: string;
  address: string;
}
