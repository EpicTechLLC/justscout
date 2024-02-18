"use client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import firebase_app from "../util/firebaseConfig";

export default function Providers({ children }: PropsWithChildren) {
  const app = firebase_app;
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
