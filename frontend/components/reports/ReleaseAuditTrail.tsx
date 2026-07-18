import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import StatusBadge from "@/components/dashboard/StatusBadge/StatusBadge";
import { HistoricalRelease } from "@/types/release";

type Props = {
  releases: HistoricalRelease[];
};

export default function ReleaseAuditTrail({ releases }: Props) {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box
        id="executive-print-report"
        sx={{
          display: "none",
          "@media print": {
            display: "block",
          },
        }}
      >
        <Typography variant="h4">Pulse AI Executive Release Report</Typography>
        <Typography>
          Generated from deterministic policy analysis, agent evidence, and
          AI-assisted executive summaries.
        </Typography>
      </Box>
      <Typography variant="h6" mb={2}>
        Release Audit Trail
      </Typography>

      <Stack spacing={1.5}>
        {releases.map((release) => (
          <Box
            key={release.id}
            sx={{
              alignItems: { xs: "flex-start", md: "center" },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Box>
              <Typography fontWeight={700}>{release.version}</Typography>
              <Typography color="text.secondary" variant="body2">
                {new Date(release.analyzedAt).toLocaleString()}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <StatusBadge status={release.status} />
              <Chip label={`Risk ${release.riskScore}`} variant="outlined" />
              <Chip
                label={`Confidence ${release.confidence}%`}
                variant="outlined"
              />
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
