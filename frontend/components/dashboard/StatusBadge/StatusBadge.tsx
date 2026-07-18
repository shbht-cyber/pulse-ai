import { Chip } from "@mui/material";

type Props = {
  status: "SAFE" | "WARNING" | "BLOCKED";
};

const COLORS = {
  SAFE: "success",
  WARNING: "warning",
  BLOCKED: "error",
} as const;

export default function StatusBadge({ status }: Props) {
  return <Chip color={COLORS[status]} label={status} />;
}
