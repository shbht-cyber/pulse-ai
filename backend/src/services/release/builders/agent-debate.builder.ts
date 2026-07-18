import type {
  AgentDebateItem,
  ReleaseScenario,
  ReleaseStatus,
} from "../../../types/release.types";

export function buildAgentDebate(
  status: ReleaseStatus,
  scenario: ReleaseScenario,
): AgentDebateItem[] {
  return [
    {
      agent: "GitHub Agent",
      vote:
        scenario === "pr-storm" || scenario === "blocked"
          ? "BLOCKED"
          : scenario === "safe"
            ? "SAFE"
            : "WARNING",
      rationale:
        "Votes based on PR approval, risk, size, and mergeability thresholds.",
    },
    {
      agent: "Jira Agent",
      vote:
        scenario === "blocked"
          ? "BLOCKED"
          : scenario === "safe"
            ? "SAFE"
            : "WARNING",
      rationale:
        "Votes based on blockers, critical tickets, open bugs, and sprint health.",
    },
    {
      agent: "Slack Agent",
      vote:
        scenario === "incident"
          ? "BLOCKED"
          : scenario === "safe"
            ? "SAFE"
            : "WARNING",
      rationale:
        "Votes based on incidents, PagerDuty alerts, deployment alerts, and hotfix discussions.",
    },
    {
      agent: "Decision Agent",
      vote: status,
      rationale:
        "Resolves the debate with deterministic policy: blockers escalate, warnings hold, clean signals deploy.",
    },
  ];
}
