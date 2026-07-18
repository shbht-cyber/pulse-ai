import type {
  FixPlanItem,
  ReleaseScenario,
  ReleaseStatus,
} from "../../../types/release.types";

export function buildFixPlan(
  status: ReleaseStatus,
  scenario: ReleaseScenario,
): FixPlanItem[] {
  if (status === "SAFE") {
    return [
      {
        action: "Proceed with canary deployment and watch release dashboards",
        owner: "Release Manager",
        priority: "P2",
        source: "Decision Agent",
        expectedRiskImpact: 3,
      },
    ];
  }

  const shared: FixPlanItem[] = [
    {
      action: "Close pending pull request approvals",
      owner: "Engineering Lead",
      priority: "P1",
      source: "GitHub Agent",
      expectedRiskImpact: 10,
    },
    {
      action: "Confirm critical Jira ticket resolution path",
      owner: "Product Engineering",
      priority: "P1",
      source: "Jira Agent",
      expectedRiskImpact: 8,
    },
  ];

  if (scenario === "incident") {
    return [
      {
        action: "Resolve active incident before reopening release window",
        owner: "Incident Commander",
        priority: "P0",
        source: "Slack Agent",
        expectedRiskImpact: 30,
      },
      {
        action: "Clear PagerDuty alert and confirm service recovery",
        owner: "On-call Engineer",
        priority: "P0",
        source: "Slack Agent",
        expectedRiskImpact: 25,
      },
      ...shared,
    ];
  }

  if (scenario === "blocked") {
    return [
      {
        action: "Resolve Jira blockers linked to release scope",
        owner: "Release Owner",
        priority: "P0",
        source: "Jira Agent",
        expectedRiskImpact: 30,
      },
      {
        action: "Fix merge conflicts in blocked pull requests",
        owner: "Code Owners",
        priority: "P0",
        source: "GitHub Agent",
        expectedRiskImpact: 24,
      },
      ...shared,
    ];
  }

  if (scenario === "pr-storm") {
    return [
      {
        action: "Split risky PRs into the next release train",
        owner: "Engineering Manager",
        priority: "P0",
        source: "GitHub Agent",
        expectedRiskImpact: 28,
      },
      {
        action: "Reduce release scope to reviewed low-risk changes",
        owner: "Release Manager",
        priority: "P1",
        source: "Risk Agent",
        expectedRiskImpact: 12,
      },
      ...shared,
    ];
  }

  return [
    ...shared,
    {
      action: "Close hotfix discussion or move it out of release scope",
      owner: "Support Engineering",
      priority: "P2",
      source: "Slack Agent",
      expectedRiskImpact: 6,
    },
  ];
}
