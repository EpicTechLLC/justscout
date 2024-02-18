"use client";

import Loading from "@/app/components/UI/Atom/Loading";
import AccountInformationTemplate from "@/app/components/UI/Template/AccountInformationTemplate/AccountInformationTemplate";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { IUserInfo } from "@/app/types/IUserInfo";
import firebaseRequest from "@/app/util/firebaseRequest";
import { User, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Account() {
  const [user, loadingAuth] = useAuthState(getAuth());
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const router = useRouter();

  async function getUserInfo() {
    const api = firebaseRequest(user as User);
    let result = (await api
      ?.get("/api/settings/account-info")
      .json()) as IUserInfo;
    if (result !== null) {
      setUserInfo(result);
    } else {
      router.replace(AppRoutes.SIGNUP);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return userInfo ? (
    <AccountInformationTemplate
      {...userInfo}
      signOut={() =>
        getAuth()
          .signOut()
          .then(() => router.push(AppRoutes.LOGIN))
          .catch((error) => {
            console.error(error);
          })
      }
    />
  ) : (
    <Loading />
  );
}
