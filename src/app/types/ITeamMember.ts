import { PermissionTypes } from "../enums/PermissionTypes";
import { IUserInfo } from "./IUserInfo";

export interface ITeamMember
  extends Omit<IUserInfo, "teamNumber" | "emailVerified" | "role"> {
  joinedTimestamp: Date | number;
  role?: PermissionTypes;
}
