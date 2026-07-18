import type {
  AgentTraceItem,
  ReleaseScenario,
  ReleaseStatus,
  RiskAnalysis,
} from "../../../types/release.types";

export function buildAgentTrace(
  status: ReleaseStatus,
  risk: RiskAnalysis,
  scenario: ReleaseScenario,
): AgentTraceItem[] {
  return [
    {
      agent: "GitHub Agent",
      status:
        scenario === "pr-storm" || scenario === "blocked"
          ? "BLOCKED"
          : status === "SAFE"
            ? "SAFE"
            : "WARNING",
      summary:
        "Inspected pull requests, review status, file churn, and mergeability.",
      findings: [
        "Review policy evaluated against pending approvals",
        "Large PR and high-risk PR thresholds checked",
        "Merge conflict status included as a hard deployment blocker",
      ],
      evidence: risk.summary.filter(
        (item) =>
          item.includes("PR") ||
          item.includes("files") ||
          item.includes("merge"),
      ),
    },
    {
      agent: "Jira Agent",
      status:
        scenario === "blocked"
          ? "BLOCKED"
          : status === "SAFE"
            ? "SAFE"
            : "WARNING",
      summary:
        "Checked blockers, critical bugs, high-priority issues, and sprint health.",
      findings: [
        "Blocker tickets force an escalation decision",
        "Critical and high-priority counts influence risk score",
        "Sprint health contributes to readiness confidence",
      ],
      evidence: risk.summary.filter(
        (item) =>
          item.includes("Jira") ||
          item.includes("bug") ||
          item.includes("Sprint"),
      ),
    },
    {
      agent: "Slack Agent",
      status:
        scenario === "incident"
          ? "BLOCKED"
          : status === "SAFE"
            ? "SAFE"
            : "WARNING",
      summary:
        "Scanned incident, deployment alert, PagerDuty, and hotfix discussion signals.",
      findings: [
        "Active incidents and PagerDuty alerts become hard blockers",
        "Hotfix discussions increase release uncertainty",
        "Deployment alerts are treated as operational warnings",
      ],
      evidence: risk.summary.filter(
        (item) =>
          item.includes("incident") ||
          item.includes("PagerDuty") ||
          item.includes("Slack") ||
          item.includes("alert"),
      ),
    },
    {
      agent: "Risk Agent",
      status,
      summary: "Calculated risk using deterministic business rules only.",
      findings: risk.deterministicRules.slice(0, 4),
      evidence: [
        `Risk score: ${risk.score}`,
        `Rollback readiness: ${risk.rollbackReadinessScore}`,
      ],
    },
    {
      agent: "Decision Agent",
      status,
      summary:
        "Converted deterministic risk into deploy, hold, or escalate guidance.",
      findings: [
        "Hard blockers override all other signals",
        "High score with no blockers is deployable",
        "Warnings hold release for human review",
      ],
      evidence:
        risk.blockers.length > 0 ? risk.blockers : risk.warnings.slice(0, 3),
    },
    {
      agent: "OpenAI Reviewer Agent",
      status,
      summary:
        "Explains the deterministic analysis for executives and release managers.",
      findings: [
        "Does not replace policy decisions",
        "Summarizes top risks and recommended actions",
        "Creates deployment-ready language for stakeholders",
      ],
      evidence: ["Input: GitHub + Jira + Slack + Risk + Decision"],
    },
  ];
}
