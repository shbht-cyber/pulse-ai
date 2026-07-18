import type {
  ReadinessCheck,
  ReleaseScenario,
  ReleaseStatus,
} from "../../../types/release.types";

export function buildReadinessChecklist(
  status: ReleaseStatus,
  scenario: ReleaseScenario,
): ReadinessCheck[] {
  return [
    {
      label: "All PRs approved",
      passed: scenario === "safe",
      source: "GitHub Agent",
    },
    {
      label: "No blockers",
      passed: status !== "BLOCKED",
      source: "Jira Agent",
    },
    {
      label: "No active incidents",
      passed: scenario !== "incident",
      source: "Slack Agent",
    },
    {
      label: "Rollback plan ready",
      passed: status !== "BLOCKED",
      source: "Risk Agent",
    },
    {
      label: "Monitoring clean",
      passed: scenario !== "incident",
      source: "Monitoring Signal",
    },
  ];
}
