import { PermissionTypes } from "../enums/PermissionTypes";

export interface IUserInfo {
  createdTimestamp: number;
  displayName: string;
  email: string;
  emailVerified: boolean;
  teamNumber: string;
  role: PermissionTypes;
}
