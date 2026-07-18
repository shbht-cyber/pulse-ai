import { BarChart3, Bot, FileText, Rocket } from "lucide-react";

import { NavigationItem } from "@/types/navigation";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Command Center",
    path: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "Release Report",
    path: "/releases",
    icon: Rocket,
  },
  {
    label: "Release Copilot",
    path: "/assistant",
    icon: Bot,
  },
  {
    label: "Audit Reports",
    path: "/reports",
    icon: FileText,
  },
];
