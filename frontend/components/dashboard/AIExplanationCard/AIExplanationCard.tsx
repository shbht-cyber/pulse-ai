import {
  Alert,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import SectionCard from "@/components/common/SectionCard/SectionCard";
import { AIAnalysis } from "@/types/release";

type Props = {
  analysis: AIAnalysis;
};

export default function AIExplanationCard({ analysis }: Props) {
  return (
    <SectionCard title="AI Executive Interpretation">
      <Stack spacing={3}>
        <Box>
          <Chip
            label={analysis.verdict}
            color="primary"
            size="small"
            sx={{ mb: 1.5 }}
          />
          <Typography color="text.secondary">
            {analysis.executiveSummary}
          </Typography>
        </Box>

        <Alert severity="info">
          AI summarizes the agent evidence for leaders. The release verdict
          remains governed by deterministic policy rules.
        </Alert>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Box flex={1}>
            <Typography variant="subtitle2" fontWeight={700}>
              Executive Risk Drivers
            </Typography>
            <List dense disablePadding>
              {analysis.topRisks.map((risk) => (
                <ListItem key={risk} disableGutters>
                  <ListItemText primary={risk} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box flex={1}>
            <Typography variant="subtitle2" fontWeight={700}>
              Recommended Next Actions
            </Typography>
            <List dense disablePadding>
              {analysis.recommendedActions.map((action) => (
                <ListItem key={action} disableGutters>
                  <ListItemText primary={action} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>

        <Box>
          <Typography variant="subtitle2" fontWeight={700}>
            Evidence Sources
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" mt={1}>
            {analysis.sourceCitations.map((citation) => (
              <Chip
                key={citation}
                label={citation}
                size="small"
                variant="outlined"
                sx={{
                  alignItems: "flex-start",
                  height: "auto",
                  maxWidth: "100%",
                  py: 0.5,
                  "& .MuiChip-label": {
                    display: "block",
                    overflow: "visible",
                    textOverflow: "clip",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </SectionCard>
  );
}
