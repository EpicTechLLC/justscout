"use client";
import SideBar from "@/app/components/UI/Template/SideBar/SideBar";
import { Settings } from "./Settings";
import { useContext, useEffect } from "react";
import { AppUserContext } from "@/app/Context/AppUserContext";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { useRouter } from "next/navigation";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userInfo, loadingUser } = useContext(AppUserContext);
  const router = useRouter();
  useEffect(() => {
    if (!userInfo && !loadingUser) {
      router.replace(AppRoutes.SIGNUP);
    }
  }, [userInfo, loadingUser]);
  return <SideBar Settings={Settings}>{children}</SideBar>;
}
