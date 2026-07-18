"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import AIExplanationCard from "@/components/dashboard/AIExplanationCard/AIExplanationCard";
import { getLatestRelease } from "@/services/api/release.service";
import { useReleaseStore } from "@/store/release.store";
import { ReleaseStatus } from "@/types/release";
import AgentTracePolicySection from "./AgentTracePolicySection";
import CollaborationSignals from "./CollaborationSignals";
import ConsensusWarRoomSection from "./ConsensusWarRoomSection";
import ReadinessActionPlanSection from "./ReadinessActionPlanSection";
import ReleaseHeader from "./ReleaseHeader";
import ReleaseSourceMetrics from "./ReleaseSourceMetrics";
import ReleaseVerdictBanner from "./ReleaseVerdictBanner";
import SimulationInsightsSection from "./SimulationInsightsSection";
import WorkflowActionDialog from "./WorkflowActionDialog";

export default function ReleasesPage() {
  const router = useRouter();
  const analysis = useReleaseStore((state) => state.analysis);
  const setAnalysis = useReleaseStore((state) => state.setAnalysis);
  const [enabledSimulations, setEnabledSimulations] = useState<string[]>([]);
  const [workflowMessage, setWorkflowMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const { data: latest, isLoading } = useQuery({
    queryKey: ["latest-release"],
    queryFn: getLatestRelease,
    enabled: !analysis,
  });

  useEffect(() => {
    if (!analysis && latest) {
      setAnalysis(latest);
    }
  }, [analysis, latest, setAnalysis]);

  const current = analysis ?? latest;

  const simulatedRisk = useMemo(() => {
    if (!current) {
      return 0;
    }

    const impact = current.simulationToggles
      .filter((toggle) => enabledSimulations.includes(toggle.id))
      .reduce((total, toggle) => total + toggle.riskImpact, 0);

    return Math.min(100, current.riskScore + impact);
  }, [current, enabledSimulations]);

  const simulatedStatus: ReleaseStatus = useMemo(() => {
    if (simulatedRisk >= 85) {
      return "SAFE";
    }

    if (simulatedRisk >= 60) {
      return "WARNING";
    }

    return "BLOCKED";
  }, [simulatedRisk]);

  const simulatedAction = useMemo(() => {
    if (simulatedStatus === "SAFE") {
      return "DEPLOY";
    }

    if (simulatedStatus === "WARNING") {
      return "HOLD";
    }

    return "ESCALATE";
  }, [simulatedStatus]);

  const simulatedUnblockTime = useMemo(() => {
    if (!current) {
      return "0 minutes";
    }

    const enabledImpact = current.simulationToggles
      .filter((toggle) => enabledSimulations.includes(toggle.id))
      .reduce((total, toggle) => total + toggle.riskImpact, 0);

    const remaining = current.fixPlan.filter(
      (item) =>
        !enabledSimulations.some((id) =>
          item.action.toLowerCase().includes(id.split("-")[0]),
        ),
    );

    if (simulatedStatus === "SAFE") {
      return "0 minutes";
    }

    return `${Math.max(15, remaining.length * 20 - enabledImpact)} minutes`;
  }, [current, enabledSimulations, simulatedStatus]);

  const openWorkflow = (label: string, description: string) => {
    setWorkflowMessage(
      `${label}\n\n${description}\n\n${current?.warRoomSummary ?? ""}`,
    );
  };

  const toggleSimulation = (id: string, checked: boolean) => {
    setEnabledSimulations((selected) =>
      checked ? [...selected, id] : selected.filter((item) => item !== id),
    );
  };

  if (isLoading) {
    return (
      <Alert severity="info">
        Loading the latest release intelligence report...
      </Alert>
    );
  }

  if (!current) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <Stack spacing={3} alignItems="center">
          <Typography variant="h4">No Release Report Available</Typography>
          <Typography color="text.secondary">
            Run the agent analysis from the Command Center to generate a
            deployment recommendation.
          </Typography>
          <Button variant="contained" onClick={() => router.push("/dashboard")}>
            Open Command Center
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack spacing={4}>
      <ReleaseHeader
        release={current}
        onRunNewAnalysis={() => router.push("/dashboard")}
      />
      <ReleaseVerdictBanner release={current} simulatedRisk={simulatedRisk} />
      <ReleaseSourceMetrics release={current} />
      <AgentTracePolicySection release={current} />
      <ReadinessActionPlanSection release={current} />
      <SimulationInsightsSection
        release={current}
        enabledSimulations={enabledSimulations}
        simulatedAction={simulatedAction}
        simulatedStatus={simulatedStatus}
        simulatedUnblockTime={simulatedUnblockTime}
        onToggleSimulation={toggleSimulation}
      />
      <ConsensusWarRoomSection
        release={current}
        onOpenWorkflow={openWorkflow}
      />
      <AIExplanationCard analysis={current.aiAnalysis} />
      <CollaborationSignals signals={current.slackSignals} />
      <WorkflowActionDialog
        copied={copied}
        message={workflowMessage}
        onClose={() => setWorkflowMessage("")}
        onCopy={() => {
          navigator.clipboard?.writeText(workflowMessage);
          setCopied(true);
        }}
        onCopiedClose={() => setCopied(false)}
      />
    </Stack>
  );
}
