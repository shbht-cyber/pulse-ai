"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAnalyzeRelease } from "@/hooks/useAnalyzeRelease";
import { getReleaseScenarios } from "@/services/api/release.service";
import { useReleaseStore } from "@/store/release.store";
import { ReleaseScenario } from "@/types/release";

import AnalysisProgress from "../AnalysisProgress/AnalysisProgress";
import AnalyzeButton from "../AnalyzeButton/AnalyzeButton";
import {
  ARCHITECTURE_STEPS,
  SOURCE_CARDS,
} from "./release-dashboard.constants";

export default function ReleaseDashboard() {
  const router = useRouter();
  const [showPipeline, setShowPipeline] = useState(false);
  const [pipelineComplete, setPipelineComplete] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [scenario, setScenario] = useState<ReleaseScenario>("warning");
  const [architectureOpen, setArchitectureOpen] = useState(false);

  const setAnalysis = useReleaseStore((state) => state.setAnalysis);

  const { data: scenarios = [] } = useQuery({
    queryKey: ["release-scenarios"],
    queryFn: getReleaseScenarios,
  });

  const { mutate, isPending, error } = useAnalyzeRelease({
    onSuccess: (response) => {
      setAnalysis(response);
      setReportReady(true);
    },
    onError: () => {
      setShowPipeline(false);
    },
  });

  const startAnalysis = () => {
    setShowPipeline(true);
    setPipelineComplete(false);
    setReportReady(false);
    mutate(scenario);
  };

  const completePipeline = useCallback(() => {
    setPipelineComplete(true);
  }, []);

  useEffect(() => {
    if (!pipelineComplete || !reportReady) {
      return;
    }

    router.push("/releases");
  }, [pipelineComplete, reportReady, router]);

  return (
    <Stack spacing={4}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <PageHeader
          title="Pulse AI"
          subtitle="Deterministic release governance with AI-generated executive review"
        />
        <Button
          variant="outlined"
          startIcon={<AccountTreeRoundedIcon />}
          onClick={() => setArchitectureOpen(true)}
          sx={{ alignSelf: { xs: "stretch", md: "center" } }}
        >
          Agent Architecture
        </Button>
      </Stack>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h5" fontWeight={800}>
              Current release train v2.8.x
            </Typography>
            <Typography color="text.secondary">
              Select a mocked release scenario and run the agent pipeline. Pulse
              AI will turn engineering signals into a deploy, hold, or escalate
              recommendation.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Release scenario"
              value={scenario}
              onChange={(event) =>
                setScenario(event.target.value as ReleaseScenario)
              }
            >
              {scenarios.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <AnalyzeButton
              loading={isPending || showPipeline}
              onClick={startAnalysis}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {SOURCE_CARDS.map((card) => {
          const Icon = card.icon;

          return (
            <Grid key={card.label} size={{ xs: 12, md: 3 }}>
              <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Icon fontSize="small" />
                    <Typography fontWeight={800}>{card.label}</Typography>
                  </Stack>
                  <Chip label={card.status} size="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {card.detail}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <AnalysisProgress active={showPipeline} onComplete={completePipeline} />

      {error && (
        <Alert severity="error">
          Pulse AI could not reach the release analysis service. Confirm the
          backend is running and the API base URL is configured correctly.
        </Alert>
      )}

      <Dialog
        open={architectureOpen}
        onClose={() => setArchitectureOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Pulse AI Agent Architecture</DialogTitle>
        <DialogContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            alignItems="stretch"
            useFlexGap
            flexWrap="wrap"
          >
            {ARCHITECTURE_STEPS.map(({ title, detail }, index, items) => (
              <Stack
                key={title}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ flex: "1 1 180px" }}
              >
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: 2,
                    minHeight: 96,
                    p: 2,
                    width: "100%",
                  }}
                >
                  <Typography fontWeight={900}>{title} Agent</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {detail}
                  </Typography>
                </Box>
                {index < items.length - 1 && (
                  <ArrowForwardRoundedIcon
                    sx={{ display: { xs: "none", md: "block" } }}
                  />
                )}
              </Stack>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
