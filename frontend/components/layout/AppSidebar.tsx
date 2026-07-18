"use client";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import { NAVIGATION_ITEMS } from "@/constants/navigation";

const SIDEBAR_WIDTH = 260;

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          p: 3,
          fontWeight: 700,
          color: "primary.main",
        }}
      >
        PulseAI
      </Typography>

      <List sx={{ px: 2 }}>
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;

          const selected = pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              selected={selected}
              onClick={() => router.push(item.path)}
              sx={{
                mb: 1,
                borderRadius: 2,
              }}
            >
              <ListItemIcon>
                <Icon size={20} />
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
