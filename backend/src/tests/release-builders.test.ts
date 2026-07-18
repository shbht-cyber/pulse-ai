import assert from "node:assert/strict";

import { releaseScenarios } from "../mocks/scenarios.mock";
import { RiskAgent } from "../services/agents/risk.agent";
import {
  buildAgentDebate,
  buildAgentTrace,
  buildApprovalActions,
  buildChangeSummary,
  buildFixPlan,
  buildReadinessChecklist,
  buildWarRoomSummary,
  estimateTimeToUnblock,
  integrationRoadmap,
} from "../services/release/builders";
import { runSuite } from "./test-utils";

const risk = new RiskAgent().analyze(
  releaseScenarios.blocked.github,
  releaseScenarios.blocked.jira,
  releaseScenarios.blocked.slack,
);

export async function runReleaseBuilderTests() {
  await runSuite("release builders", [
    {
      name: "builds evidence sections",
      run() {
        assert.equal(buildAgentTrace("BLOCKED", risk, "blocked").length, 6);
        assert.equal(buildAgentDebate("BLOCKED", "blocked").at(-1)?.vote, "BLOCKED");
        assert.ok(buildReadinessChecklist("BLOCKED", "blocked").some((item) => !item.passed));
      },
    },
    {
      name: "builds action and summary fields",
      run() {
        const fixPlan = buildFixPlan("BLOCKED", "blocked");

        assert.equal(fixPlan[0].priority, "P0");
        assert.match(buildWarRoomSummary("v1", "BLOCKED", risk.summary, fixPlan), /Release v1/);
        assert.match(estimateTimeToUnblock("BLOCKED", fixPlan), /minutes/);
        assert.equal(buildApprovalActions("SAFE")[0].label, "Approve deployment");
      },
    },
    {
      name: "builds fix plans for each release posture",
      run() {
        assert.equal(buildFixPlan("SAFE", "safe")[0].priority, "P2");
        assert.equal(buildFixPlan("BLOCKED", "incident")[0].owner, "Incident Commander");
        assert.equal(buildFixPlan("WARNING", "pr-storm")[0].owner, "Engineering Manager");
        assert.equal(buildFixPlan("WARNING", "warning").at(-1)?.owner, "Support Engineering");
      },
    },
    {
      name: "builds debate branches for different scenarios",
      run() {
        assert.equal(buildAgentDebate("SAFE", "safe")[0].vote, "SAFE");
        assert.equal(buildAgentDebate("BLOCKED", "incident")[2].vote, "BLOCKED");
        assert.equal(buildAgentDebate("BLOCKED", "pr-storm")[0].vote, "BLOCKED");
      },
    },
    {
      name: "builds change and roadmap data",
      run() {
        assert.equal(buildChangeSummary(80, 60, "warning")[0].direction, "down");
        assert.equal(buildChangeSummary(60, 80, "safe")[1].direction, "up");
        assert.equal(buildChangeSummary(70, 90, "incident")[1].direction, "down");
        assert.ok(integrationRoadmap.some((item) => item.includes("GitHub")));
      },
    },
  ]);
}
