import {
  Alert,
  Box,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import StatusBadge from "@/components/dashboard/StatusBadge/StatusBadge";
import { ReleaseAnalysisResponse } from "@/types/release";

type Props = {
  release: ReleaseAnalysisResponse;
};

export default function AgentTracePolicySection({ release }: Props) {
  const confidenceRows = [
    ["Data freshness", release.confidenceBreakdown.dataFreshness],
    ["Source coverage", release.confidenceBreakdown.sourceCoverage],
    ["Signal agreement", release.confidenceBreakdown.signalAgreement],
  ];

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
          <Typography variant="h6" mb={2}>
            Agent Evidence Trace
          </Typography>
          <Stack spacing={1.5}>
            {release.agentTrace.map((trace) => (
              <Box
                key={trace.agent}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Typography fontWeight={800}>{trace.agent}</Typography>
                  <StatusBadge status={trace.status} />
                </Stack>
                <Typography color="text.secondary" variant="body2" mt={1}>
                  {trace.summary}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  flexWrap="wrap"
                  mt={1.5}
                >
                  {trace.evidence.slice(0, 3).map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, lg: 6 }}>
        <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
          <Typography variant="h6" mb={2}>
            Deterministic Release Policy
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            The release verdict is calculated by deterministic rules. AI only
            explains agent evidence and executive actions.
          </Alert>
          <Stack spacing={1}>
            {release.deterministicRules.map((rule) => (
              <Typography key={rule} variant="body2">
                • {rule}
              </Typography>
            ))}
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" fontWeight={800} mb={1}>
            Confidence Model
          </Typography>
          {confidenceRows.map(([label, value]) => (
            <Box key={label} mb={1.5}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">{label}</Typography>
                <Typography variant="body2">{value}%</Typography>
              </Stack>
              <LinearProgress variant="determinate" value={Number(value)} />
            </Box>
          ))}
          <Typography color="text.secondary" variant="body2">
            {release.confidenceBreakdown.explanation}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
