"use client";
import { PropsWithChildren } from "react";
import Header from "./Header";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme";

export default function LayoutWrapper({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ p: 3 }}>
        <CssBaseline />
        <Header />
        {children}
      </Box>
    </ThemeProvider>
  );
}
