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
import { IPermission } from "../types/IPermission";
import { PermissionTypes } from "../enums/PermissionTypes";
import { ITeamMember } from "../types/ITeamMember";

const admin: IPermission = {
  Create: true,
  Read: true,
  Update: true,
  Delete: true,
};

const member: IPermission = {
  Create: false,
  Read: true,
  Update: false,
  Delete: false,
};

const defaultPermission: IPermission = {
  Create: false,
  Read: false,
  Update: false,
  Delete: false,
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, loadingAuth] = useAuthState(getAuth());
  const [localLoading, setLocalLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [permission, setPermission] = useState<IPermission>(defaultPermission);
  const pathname = usePathname();
  const router = useRouter();
  async function getInfo() {
    setLocalLoading(true);
    const api = firebaseRequest(user as User);
    let result = (await api
      .get("/api/settings/account-info")
      .json()) as IUserInfo;
    let memberInfo = (await api
      .get(`/api/settings/member-info?teamNumber=${result?.teamNumber}`)
      .json()) as ITeamMember;
    if (result === null || memberInfo === null) {
      router.replace(AppRoutes.SIGNUP);
    } else if (pathname === AppRoutes.SIGNUP) {
      router.replace(AppRoutes.ACCOUNT);
    }

    if (memberInfo?.role === PermissionTypes.ADMIN) {
      setPermission(admin);
    } else {
      setPermission(member);
    }

    setUserInfo(result);
    setLocalLoading(false);
  }
  useEffect(() => {
    if (!loadingAuth) {
      if (user === null || !user) {
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
        permission: permission,
      }}
    >
      {children}
    </AppUserContext.Provider>
  );
}
