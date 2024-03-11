import { IUserInfo } from "./IUserInfo";

export interface ITeamMember
  extends Omit<IUserInfo, "teamNumber" | "emailVerified" | "role"> {
  joinedTimestamp: Date | number;
}
