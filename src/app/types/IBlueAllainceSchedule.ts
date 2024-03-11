import { IBlueAllianceScheduleAlliance } from "./IBlueAllianceScheduleAlliance";

export interface IBlueAllianceSchedule {
  key: string;
  comp_level: "qm";
  set_number: number;
  match_number: number;
  winning_alliance: string;
  event_key: string;
  time: number;
  predicted_time: number;
  actual_time: number;
  alliances: {
    red: IBlueAllianceScheduleAlliance;
    blue: IBlueAllianceScheduleAlliance;
  };
}
