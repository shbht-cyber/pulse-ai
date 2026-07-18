"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <AppSidebar />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <AppHeader />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: 4,
            bgcolor: "background.default",
            minWidth: 0,
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
