"use client";
import { PropsWithChildren } from "react";
import Header from "./Header";
import { Box, CssBaseline } from "@mui/material";

export default function LayoutWrapper({ children }: PropsWithChildren) {
  return (
    <Box component="main" sx={{ p: 3 }}>
      <CssBaseline />
      <Header />
      {children}
    </Box>
  );
}
