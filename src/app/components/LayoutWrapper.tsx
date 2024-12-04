"use client";
import {
	Box,
  createAppContext,
  createTheme,
  CssBaseline,
} from "@epictechllc/just-scout-components";
import { PropsWithChildren } from "react";
import Header from "./Header";

export default function LayoutWrapper({ children }: PropsWithChildren) {
  const { AppProvider } = createAppContext({});

  return (
    <Box component="main" sx={{ p: 3 }}>
      <CssBaseline />
      <Header />
      <AppProvider theme={createTheme()}>{children}</AppProvider>
    </Box>
  );
}
