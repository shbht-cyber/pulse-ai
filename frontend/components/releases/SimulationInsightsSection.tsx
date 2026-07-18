import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import {
  Alert,
  Box,
  Grid,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import { ReleaseAnalysisResponse, ReleaseStatus } from "@/types/release";
import { STATUS_COLOR } from "./release-page.constants";

type Props = {
  release: ReleaseAnalysisResponse;
  enabledSimulations: string[];
  simulatedAction: string;
  simulatedStatus: ReleaseStatus;
  simulatedUnblockTime: string;
  onToggleSimulation: (id: string, checked: boolean) => void;
};

export default function SimulationInsightsSection({
  release,
  enabledSimulations,
  simulatedAction,
  simulatedStatus,
  simulatedUnblockTime,
  onToggleSimulation,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>
            Change Since Last Analysis
          </Typography>
          <Stack spacing={1.5}>
            {release.changeSummary.map((change) => (
              <Stack key={change.label} direction="row" spacing={1.5}>
                {change.direction === "up" ? (
                  <ArrowUpwardRoundedIcon color="success" />
                ) : change.direction === "down" ? (
                  <ArrowDownwardRoundedIcon color="error" />
                ) : (
                  <RadioButtonUncheckedRoundedIcon color="disabled" />
                )}
                <Box>
                  <Typography fontWeight={800}>{change.label}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {change.detail}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>
            What-if Risk Simulator
          </Typography>
          <Alert severity={STATUS_COLOR[simulatedStatus]} sx={{ mb: 2 }}>
            Simulated decision: {simulatedAction} ({simulatedStatus}) • Time to
            unblock: {simulatedUnblockTime}
          </Alert>
          <Stack spacing={1}>
            {release.simulationToggles.map((toggle) => (
              <Stack
                key={toggle.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2">{toggle.label}</Typography>
                <Switch
                  checked={enabledSimulations.includes(toggle.id)}
                  onChange={(event) =>
                    onToggleSimulation(toggle.id, event.target.checked)
                  }
                />
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>
            Signal Freshness
          </Typography>
          {Object.entries(release.sourceFreshness).map(
            ([source, freshness]) => (
              <Stack
                key={source}
                direction="row"
                justifyContent="space-between"
                mb={1}
              >
                <Typography textTransform="capitalize">{source}</Typography>
                <Typography color="text.secondary">{freshness}</Typography>
              </Stack>
            ),
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
