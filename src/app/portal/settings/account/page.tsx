"use client";

import { AppUserContext } from "@/app/Context/AppUserContext";
import AccountInformationTemplate from "@/app/components/UI/Template/AccountInformationTemplate/AccountInformationTemplate";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { IUserInfo } from "@/app/types/IUserInfo";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Account() {
  const { userInfo, loadingUser } = useContext(AppUserContext);
  const router = useRouter();
  useEffect(() => {
    if (!userInfo && !loadingUser) {
      router.replace(AppRoutes.SIGNUP);
    }
  }, [userInfo, loadingUser]);
  return (
    <AccountInformationTemplate
      {...(userInfo as IUserInfo)}
      signOut={() =>
        getAuth()
          .signOut()
          .then(() => router.push(AppRoutes.LOGIN))
          .catch((error) => {
            console.error(error);
          })
      }
    />
  );
}
