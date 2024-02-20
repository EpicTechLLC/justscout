"use client";

import { User, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/UI/Atom/Loading";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import firebaseRequest from "../util/firebaseRequest";
import { IUserInfo } from "../types/IUserInfo";
import { AppRoutes } from "../enums/AppRoutes";
import { AppUserContext } from "../Context/AppUserContext";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, loadingAuth] = useAuthState(getAuth());
  const [localLoading, setLocalLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const pathname = usePathname();
  const router = useRouter();
  async function getInfo() {
    setLocalLoading(true);
    const api = firebaseRequest(user as User);
    let result = (await api
      ?.get("/api/settings/account-info")
      .json()) as IUserInfo;
    if (result === null) {
      router.replace(AppRoutes.SIGNUP);
    } else if (pathname === AppRoutes.SIGNUP) {
      router.replace(AppRoutes.ACCOUNT);
    }
    setUserInfo(result);
    setLocalLoading(false);
  }
  useEffect(() => {
    if (!loadingAuth) {
      if (user === null) {
        router.replace(AppRoutes.LOGIN);
        return;
      }
      getInfo();
    }
  }, [loadingAuth]);

  return localLoading ? (
    <Loading />
  ) : (
    <AppUserContext.Provider
      value={{
        userInfo,
        user: user as User,
        loadingUser: localLoading,
        triggerUpdate: getInfo,
      }}
    >
      {children}
    </AppUserContext.Provider>
  );
}
