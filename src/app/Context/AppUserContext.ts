import { createContext } from "react";
import { IUserInfo } from "../types/IUserInfo";
import { User } from "firebase/auth";

export interface IAppUserContext {
  user: User | undefined;
  userInfo: IUserInfo | undefined;
  loadingUser: boolean;
  triggerUpdate: () => void;
}

export const AppUserContext = createContext<IAppUserContext>({
  user: undefined,
  userInfo: undefined,
  loadingUser: true,
  triggerUpdate: () => {},
});
