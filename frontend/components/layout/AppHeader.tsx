"use client";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Bell } from "lucide-react";

export default function AppHeader() {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Release Governance Command Center
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton>
          <Bell size={20} />
        </IconButton>

        <Avatar
          sx={{
            ml: 2,
            bgcolor: "primary.main",
          }}
        >
          S
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
