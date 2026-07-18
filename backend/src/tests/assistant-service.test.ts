import assert from "node:assert/strict";

import { releaseScenarios } from "../mocks/scenarios.mock";
import { AssistantService } from "../services/assistant/assistant.service";
import type { ReleaseAnalysisResponse } from "../types/release.types";
import { runSuite } from "./test-utils";

const analysis: ReleaseAnalysisResponse = {
  id: "test",
  scenario: "warning",
  scenarioLabel: "Warning release",
  version: "v-test",
  status: "WARNING",
  riskScore: 51,
  confidence: 82,
  rollbackReadinessScore: 88,
  reason: "Deployment contains non-blocking risks.",
  recommendation: "Review warnings before deploying.",
  executiveAction: "HOLD",
  metrics: {
    github: releaseScenarios.warning.github,
    jira: releaseScenarios.warning.jira,
    slack: releaseScenarios.warning.slack,
  },
  summary: ["2 PR(s) waiting for review"],
  aiAnalysis: {
    executiveSummary: "Warnings remain.",
    topRisks: ["Pending reviews"],
    recommendedActions: ["Close pending reviews"],
    verdict: "WARNING",
    sourceCitations: ["GitHub Agent"],
  },
  agentTrace: [],
  deterministicRules: [],
  readinessChecklist: [],
  fixPlan: [
    {
      action: "Close pending pull request approvals",
      owner: "Engineering Lead",
      priority: "P1",
      source: "GitHub Agent",
      expectedRiskImpact: 10,
    },
  ],
  confidenceBreakdown: {
    dataFreshness: 90,
    sourceCoverage: 75,
    signalAgreement: 80,
    missingIntegrations: [],
    explanation: "test",
  },
  changeSummary: [],
  sourceFreshness: releaseScenarios.warning.freshness,
  agentDebate: [],
  warRoomSummary: "test",
  approvalActions: [],
  simulationToggles: [],
  estimatedTimeToUnblock: "30 minutes",
  integrationRoadmap: [],
  slackSignals: [],
  analyzedAt: new Date().toISOString(),
};

export async function runAssistantServiceTests() {
  const previousKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  const service = new AssistantService();

  await runSuite("assistant service", [
    {
      name: "asks user to analyze first",
      async run() {
        const reply = await service.chat({
          message: "hello",
          analysis: null,
        });

        assert.match(reply, /Run a release analysis first/);
      },
    },
    {
      name: "answers with fallback source citations",
      async run() {
        const reply = await service.chat({
          message: "What should I fix before deployment?",
          analysis,
        });

        assert.match(reply, /GitHub Agent/);
        assert.match(reply, /Engineering Lead/);
      },
    },
    {
      name: "explains blocked and non-blocked status",
      async run() {
        const warningReply = await service.chat({
          message: "Is this blocked?",
          analysis,
        });
        const blockedReply = await service.chat({
          message: "Is this blocked?",
          analysis: {
            ...analysis,
            status: "BLOCKED",
            reason: "Critical deployment blockers detected.",
          },
        });

        assert.match(warningReply, /not blocked/);
        assert.match(blockedReply, /Deployment is blocked/);
      },
    },
    {
      name: "explains risk and default executive summary",
      async run() {
        const riskReply = await service.chat({
          message: "What PR risk exists?",
          analysis,
        });
        const summaryReply = await service.chat({
          message: "Summarize for leadership",
          analysis,
        });

        assert.match(riskReply, /release risk is 51\/100/);
        assert.match(summaryReply, /Warnings remain/);
      },
    },
  ]);

  process.env.OPENAI_API_KEY = previousKey;
}
