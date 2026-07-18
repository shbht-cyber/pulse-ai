import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import StatusBadge from "@/components/dashboard/StatusBadge/StatusBadge";
import { ReleaseAnalysisResponse } from "@/types/release";

type Props = {
  release: ReleaseAnalysisResponse;
  onOpenWorkflow: (label: string, description: string) => void;
};

export default function ConsensusWarRoomSection({
  release,
  onOpenWorkflow,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>
            Agent Consensus
          </Typography>
          <Stack spacing={1.5}>
            {release.agentDebate.map((item) => (
              <Box key={item.agent}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={800}>{item.agent}</Typography>
                  <StatusBadge status={item.vote} />
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  {item.rationale}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, lg: 6 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="h6">War Room Brief</Typography>
            <Button
              size="small"
              startIcon={<ContentCopyRoundedIcon />}
              onClick={() =>
                navigator.clipboard?.writeText(release.warRoomSummary)
              }
            >
              Copy
            </Button>
          </Stack>
          <Typography>{release.warRoomSummary}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" fontWeight={800} mb={1}>
            Human Approval Workflow
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {release.approvalActions.map((action) => (
              <Chip
                key={action.label}
                label={action.label}
                variant="outlined"
                onClick={() => onOpenWorkflow(action.label, action.description)}
              />
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
