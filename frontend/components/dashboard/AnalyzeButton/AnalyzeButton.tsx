"use client";

import { Button } from "@mui/material";

type Props = {
  loading: boolean;
  onClick: () => void;
};

export default function AnalyzeButton({ loading, onClick }: Props) {
  return (
    <Button
      fullWidth
      size="large"
      variant="contained"
      disabled={loading}
      onClick={onClick}
      sx={{
        height: 52,
        borderRadius: 2,
        fontWeight: 700,
      }}
    >
      {loading ? "Running Agent Analysis..." : "Analyze Release Risk"}
    </Button>
  );
}
