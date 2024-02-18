import { ITeam } from "./ITeam";

export interface ITeamList {
  teamCountTotal: number;
  teamCountPage: number;
  pageCurrent: number;
  pageTotal: number;
  teams: ITeam[];
}
