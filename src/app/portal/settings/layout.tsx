"use client";
import SideBar from "@/app/components/UI/Template/SideBar/SideBar";
import { Settings } from "./Settings";
import { Card } from "@mui/material";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SideBar Settings={Settings}>{children}</SideBar>;
}
