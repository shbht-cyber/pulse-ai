import { ReportRange, ReleaseStatus } from "@/types/release";

export const REPORT_FILTERS: { label: string; value: ReportRange }[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
];

export const STATUS_COLORS: Record<ReleaseStatus, string> = {
  SAFE: "#22C55E",
  WARNING: "#F59E0B",
  BLOCKED: "#EF4444",
};
