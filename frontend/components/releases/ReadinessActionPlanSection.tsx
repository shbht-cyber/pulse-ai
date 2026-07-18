import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { ReleaseAnalysisResponse } from "@/types/release";

type Props = {
  release: ReleaseAnalysisResponse;
};

export default function ReadinessActionPlanSection({ release }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 5 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>
            Operational Readiness Checklist
          </Typography>
          <Stack spacing={1.5}>
            {release.readinessChecklist.map((check) => (
              <Stack
                key={check.label}
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                {check.passed ? (
                  <CheckCircleRoundedIcon color="success" />
                ) : (
                  <RadioButtonUncheckedRoundedIcon color="warning" />
                )}
                <Box>
                  <Typography fontWeight={700}>{check.label}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {check.source}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, lg: 7 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>
            Owner Action Plan
          </Typography>
          <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Impact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {release.fixPlan.map((item) => (
                  <TableRow key={item.action}>
                    <TableCell sx={{ minWidth: 220 }}>{item.action}</TableCell>
                    <TableCell>{item.owner}</TableCell>
                    <TableCell>{item.priority}</TableCell>
                    <TableCell>+{item.expectedRiskImpact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography mt={2} color="text.secondary">
            Estimated time to restore deployability:{" "}
            {release.estimatedTimeToUnblock}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
