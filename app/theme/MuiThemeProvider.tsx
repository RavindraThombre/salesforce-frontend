"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import { getMuiTheme } from "./muiTheme";

export default function MuiProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  const muiTheme = useMemo(
    () => getMuiTheme(resolvedTheme === "dark" ? "dark" : "light"),
    [resolvedTheme]
  );

  if (!resolvedTheme) return null;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
