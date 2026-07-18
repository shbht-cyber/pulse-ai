import type {
  ApprovalAction,
  ChangeSummary,
  FixPlanItem,
  ReleaseScenario,
  ReleaseStatus,
} from "../../../types/release.types";

export const integrationRoadmap = [
  "GitHub REST: repo URL input, open PRs, reviews, changed files, mergeability",
  "Jira Cloud: blocker/critical tickets, sprint health, release scope",
  "Slack API: incident channels, deployment alerts, hotfix discussions",
  "Monitoring: active incidents, SLO burn, rollback health",
];

export function buildChangeSummary(
  previousRiskScore: number,
  currentRiskScore: number,
  scenario: ReleaseScenario,
): ChangeSummary[] {
  const delta = currentRiskScore - previousRiskScore;

  return [
    {
      label: "Risk score",
      direction: delta > 0 ? "up" : delta < 0 ? "down" : "neutral",
      detail: `Moved from ${previousRiskScore} to ${currentRiskScore}`,
    },
    {
      label: "Release posture",
      direction:
        scenario === "safe"
          ? "up"
          : scenario === "incident" || scenario === "blocked"
            ? "down"
            : "neutral",
      detail:
        scenario === "safe"
          ? "Signals are cleaner than the previous analysis"
          : scenario === "incident"
            ? "New production incident detected"
            : scenario === "blocked"
              ? "Hard blockers remain unresolved"
              : "Non-blocking warnings still need review",
    },
  ];
}

export function buildApprovalActions(
  status: ReleaseStatus,
): ApprovalAction[] {
  return [
    {
      label: status === "SAFE" ? "Approve deployment" : "Approve with warning",
      intent: "approve",
      description: "Record human release approval with the current risk context.",
    },
    {
      label: "Block release",
      intent: "block",
      description: "Stop deployment until the fix plan is complete.",
    },
    {
      label: "Request fixes",
      intent: "fix",
      description: "Send the generated action plan to owners.",
    },
    {
      label: "Generate stakeholder update",
      intent: "notify",
      description: "Create a release war-room summary for Slack or email.",
    },
  ];
}

export function buildWarRoomSummary(
  version: string,
  status: ReleaseStatus,
  risks: string[],
  fixPlan: FixPlanItem[],
) {
  const topRisks =
    risks.slice(0, 3).join("; ") || "No major release risks detected";
  const owners = [...new Set(fixPlan.map((item) => item.owner))]
    .slice(0, 3)
    .join(", ");

  return `Release ${version} is ${status}. Main risks: ${topRisks}. Owners: ${owners || "Release Manager"}. Next review recommended in 30 minutes.`;
}

export function estimateTimeToUnblock(
  status: ReleaseStatus,
  fixPlan: FixPlanItem[],
) {
  if (status === "SAFE") {
    return "0 minutes";
  }

  const p0Count = fixPlan.filter((item) => item.priority === "P0").length;
  const p1Count = fixPlan.filter((item) => item.priority === "P1").length;

  return `${Math.max(30, p0Count * 45 + p1Count * 20)} minutes`;
}
