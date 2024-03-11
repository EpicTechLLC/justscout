import { createContext } from "react";
import { IUserInfo } from "../types/IUserInfo";
import { User } from "firebase/auth";
import { IPermission } from "../types/IPermission";

export interface IAppUserContext {
  user: User | undefined;
  userInfo: IUserInfo | undefined;
  loadingUser: boolean;
  triggerUpdate: () => void;
  permission: IPermission;
}

export const AppUserContext = createContext<IAppUserContext>({
  user: undefined,
  userInfo: undefined,
  loadingUser: true,
  permission: {
    Create: false,
    Read: false,
    Update: false,
    Delete: false,
  },
  triggerUpdate: () => {},
});
