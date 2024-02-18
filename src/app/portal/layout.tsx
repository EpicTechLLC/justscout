"use client";

import { User, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/UI/Atom/Loading";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import firebaseRequest from "../util/firebaseRequest";
import { IUserInfo } from "../types/IUserInfo";
import { AppRoutes } from "../enums/AppRoutes";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, loadingAuth] = useAuthState(getAuth());
  const [localLoading, setLocalLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  async function getInfo() {
    const api = firebaseRequest(user as User);
    let result = (await api
      ?.get("/api/settings/account-info")
      .json()) as IUserInfo;
    if (result === null) {
      router.replace(AppRoutes.SIGNUP);
    } else if (pathname === AppRoutes.SIGNUP) {
      router.replace(AppRoutes.ACCOUNT);
    }
    setLocalLoading(false);
  }
  useEffect(() => {
    if (!loadingAuth && user) {
      setLocalLoading(true);
      getInfo();
    }
  }, [loadingAuth, user]);

  return localLoading ? <Loading /> : children;
}
