"use client";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import firebase_app from "../util/firebaseConfig";
import { ColorModeContext } from "../Context/ColorModeContext";
import { getAnalytics } from "firebase/analytics";

export default function Providers({ children }: PropsWithChildren) {
  const app = firebase_app;

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [updatePreference, setUpdatePreference] = useState<boolean>(false);
  useEffect(() => {
    getAnalytics(app);
  }, []);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        setUpdatePreference(true);
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: updatePreference ? mode : prefersDarkMode ? "dark" : "light",
        },
      }),
    [mode, prefersDarkMode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
