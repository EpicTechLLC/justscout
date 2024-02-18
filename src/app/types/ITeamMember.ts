import { IAppUser } from "./IAppUser";

export interface ITeamMember
  extends Omit<IAppUser, "teamNumber" | "emailVerified"> {
  joinedTimestamp: Date | number;
}
