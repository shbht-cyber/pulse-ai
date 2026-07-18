import { Grid, Paper, Stack, Typography } from "@mui/material";

import MetricCard from "@/components/common/MetricCard/MetricCard";
import StatusBadge from "@/components/dashboard/StatusBadge/StatusBadge";
import { ReleaseAnalysisResponse } from "@/types/release";
import { STATUS_COLOR } from "./release-page.constants";

type Props = {
  release: ReleaseAnalysisResponse;
  simulatedRisk: number;
};

export default function ReleaseVerdictBanner({
  release,
  simulatedRisk,
}: Props) {
  return (
    <Paper
      sx={{
        borderColor: `${STATUS_COLOR[release.status]}.main`,
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        p: 3,
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={1.5}>
            <StatusBadge status={release.status} />
            <Typography variant="h3" fontWeight={900}>
              {release.executiveAction}
            </Typography>
            <Typography color="text.secondary">{release.reason}</Typography>
            <Typography>{release.recommendation}</Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 3 }}>
              <MetricCard title="Policy Risk" value={release.riskScore} />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <MetricCard title="What-if Risk" value={simulatedRisk} />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <MetricCard title="Confidence" value={`${release.confidence}%`} />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <MetricCard
                title="Rollback"
                value={`${release.rollbackReadinessScore}%`}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
