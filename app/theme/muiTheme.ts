"use client";

import { createTheme } from "@mui/material/styles";

export const getMuiTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      background: {
        default: "hsl(var(--background))",
        paper: "hsl(var(--background))",
      },
      text: {
        primary: "hsl(var(--foreground))",
      },
      primary: {
        main: "hsl(var(--primary))",
      },
      secondary: {
        main: "hsl(var(--secondary))",
      },
      divider: "hsl(var(--border))",
    },
    shape: {
      borderRadius: 10,
    },
  });
