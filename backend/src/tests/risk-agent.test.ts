import assert from "node:assert/strict";

import { releaseScenarios } from "../mocks/scenarios.mock";
import { RiskAgent } from "../services/agents/risk.agent";
import { runSuite } from "./test-utils";

const agent = new RiskAgent();

export async function runRiskAgentTests() {
  await runSuite("risk agent", [
    {
      name: "scores safe scenario high",
      run() {
        const risk = agent.analyze(
          releaseScenarios.safe.github,
          releaseScenarios.safe.jira,
          releaseScenarios.safe.slack,
        );

        assert.equal(risk.score, 100);
        assert.equal(risk.blockers.length, 0);
        assert.ok(risk.confidence >= 80);
      },
    },
    {
      name: "detects blocked scenario blockers",
      run() {
        const risk = agent.analyze(
          releaseScenarios.blocked.github,
          releaseScenarios.blocked.jira,
          releaseScenarios.blocked.slack,
        );

        assert.ok(risk.score < 50);
        assert.ok(risk.blockers.length > 0);
        assert.ok(risk.deterministicRules.length > 0);
      },
    },
    {
      name: "treats incidents as hard blockers",
      run() {
        const risk = agent.analyze(
          releaseScenarios.incident.github,
          releaseScenarios.incident.jira,
          releaseScenarios.incident.slack,
        );

        assert.match(risk.blockers.join(" "), /production incident|PagerDuty/);
        assert.ok(risk.rollbackReadinessScore < 70);
      },
    },
  ]);
}
