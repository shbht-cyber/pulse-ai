import assert from "node:assert/strict";

import { DecisionAgent } from "../services/agents/decision.agent";
import type { RiskAnalysis } from "../types/release.types";
import { runSuite } from "./test-utils";

const baseRisk: RiskAnalysis = {
  score: 90,
  confidence: 90,
  rollbackReadinessScore: 90,
  blockers: [],
  warnings: [],
  deterministicRules: [],
  confidenceBreakdown: {
    dataFreshness: 90,
    sourceCoverage: 90,
    signalAgreement: 90,
    missingIntegrations: [],
    explanation: "test",
  },
  summary: [],
};

export async function runDecisionAgentTests() {
  const agent = new DecisionAgent();

  await runSuite("decision agent", [
    {
      name: "deploys safe releases",
      run() {
        assert.equal(agent.decide(baseRisk).executiveAction, "DEPLOY");
      },
    },
    {
      name: "holds warning releases",
      run() {
        assert.equal(agent.decide({ ...baseRisk, score: 70 }).status, "WARNING");
      },
    },
    {
      name: "escalates blocked releases",
      run() {
        const decision = agent.decide({
          ...baseRisk,
          blockers: ["active incident"],
        });

        assert.equal(decision.status, "BLOCKED");
        assert.equal(decision.executiveAction, "ESCALATE");
      },
    },
  ]);
}
