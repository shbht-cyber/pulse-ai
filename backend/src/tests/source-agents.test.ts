import assert from "node:assert/strict";

import { releaseScenarios } from "../mocks/scenarios.mock";
import { GithubAgent } from "../services/agents/github.agent";
import { JiraAgent } from "../services/agents/jira.agent";
import { SlackAgent } from "../services/agents/slack.agent";
import { runSuite } from "./test-utils";

export async function runSourceAgentTests() {
  await runSuite("source agents", [
    {
      name: "return provided mock signals",
      async run() {
        assert.deepEqual(
          await new GithubAgent().analyze(releaseScenarios.warning.github),
          releaseScenarios.warning.github,
        );
        assert.deepEqual(
          await new JiraAgent().analyze(releaseScenarios.warning.jira),
          releaseScenarios.warning.jira,
        );
        assert.deepEqual(
          await new SlackAgent().analyze(releaseScenarios.warning.slack),
          releaseScenarios.warning.slack,
        );
      },
    },
  ]);
}
