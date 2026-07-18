import { ReleaseStatus } from "@/types/release";

export const STATUS_COLOR: Record<
  ReleaseStatus,
  "success" | "warning" | "error"
> = {
  SAFE: "success",
  WARNING: "warning",
  BLOCKED: "error",
};
