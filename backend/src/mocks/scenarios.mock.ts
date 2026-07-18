import { ReleaseScenarioData, ScenarioOption } from "../types/release.types";

export const scenarioOptions: ScenarioOption[] = [
  {
    id: "safe",
    label: "Safe release",
    description:
      "Clean release train with approved PRs and no active incidents.",
  },
  {
    id: "warning",
    label: "Warning release",
    description: "Some review and quality concerns, but no hard blockers.",
  },
  {
    id: "blocked",
    label: "Blocked release",
    description:
      "Critical Jira blockers and merge conflicts prevent deployment.",
  },
  {
    id: "incident",
    label: "Production incident active",
    description: "Slack and PagerDuty signals indicate an active incident.",
  },
  {
    id: "pr-storm",
    label: "High-risk PR storm",
    description:
      "Large risky PR batch with heavy file churn and pending reviews.",
  },
];

export const releaseScenarios: Record<string, ReleaseScenarioData> = {
  safe: {
    id: "safe",
    label: "Safe release",
    description: "Approved release with low operational risk.",
    version: "v2.9.0",
    previousRiskScore: 88,
    github: {
      totalPRs: 6,
      pendingReviews: 0,
      riskyPRs: 0,
      largePRs: 0,
      filesChanged: 42,
      mergeConflicts: 0,
      reviewStatus: "All release PRs are approved and mergeable",
    },
    jira: {
      blockerTickets: 0,
      criticalTickets: 0,
      highTickets: 1,
      openBugs: 1,
      sprintHealth: 96,
    },
    slack: {
      incidentsToday: 0,
      deploymentAlerts: 0,
      pagerDutyAlerts: 0,
      hotfixDiscussions: 0,
    },
    freshness: {
      github: "synced 9s ago",
      jira: "synced 14s ago",
      slack: "synced 11s ago",
      monitoring: "synced 20s ago",
    },
    simulationToggles: [
      { id: "rollback-ready", label: "Rollback plan verified", riskImpact: 4 },
      { id: "canary-enabled", label: "Canary deploy enabled", riskImpact: 3 },
    ],
    slackSignals: [
      "#release: QA signed off on v2.9.0",
      "#ops: No deployment alerts in the last 24h",
    ],
  },
  warning: {
    id: "warning",
    label: "Warning release",
    description: "Deployable release with review and bug risk.",
    version: "v2.8.1",
    previousRiskScore: 72,
    github: {
      totalPRs: 11,
      pendingReviews: 2,
      riskyPRs: 1,
      largePRs: 2,
      filesChanged: 184,
      mergeConflicts: 0,
      reviewStatus: "2 PRs need approval before the release train closes",
    },
    jira: {
      blockerTickets: 0,
      criticalTickets: 1,
      highTickets: 3,
      openBugs: 7,
      sprintHealth: 82,
    },
    slack: {
      incidentsToday: 0,
      deploymentAlerts: 1,
      pagerDutyAlerts: 0,
      hotfixDiscussions: 2,
    },
    freshness: {
      github: "synced 12s ago",
      jira: "synced 18s ago",
      slack: "synced 8s ago",
      monitoring: "synced 24s ago",
    },
    simulationToggles: [
      { id: "approve-prs", label: "Approve pending PRs", riskImpact: 10 },
      { id: "resolve-critical", label: "Resolve critical Jira", riskImpact: 8 },
      { id: "close-hotfix", label: "Close hotfix discussions", riskImpact: 6 },
    ],
    slackSignals: [
      "#deployments: One warning from staging smoke tests",
      "#release: Hotfix scope still under discussion",
      "#eng-managers: Critical Jira owner confirmed",
    ],
  },
  blocked: {
    id: "blocked",
    label: "Blocked release",
    description: "Release should not ship until hard blockers are cleared.",
    version: "v2.8.2",
    previousRiskScore: 68,
    github: {
      totalPRs: 9,
      pendingReviews: 3,
      riskyPRs: 2,
      largePRs: 2,
      filesChanged: 241,
      mergeConflicts: 2,
      reviewStatus: "Merge conflicts detected in payment and auth PRs",
    },
    jira: {
      blockerTickets: 2,
      criticalTickets: 3,
      highTickets: 6,
      openBugs: 12,
      sprintHealth: 61,
    },
    slack: {
      incidentsToday: 0,
      deploymentAlerts: 2,
      pagerDutyAlerts: 0,
      hotfixDiscussions: 4,
    },
    freshness: {
      github: "synced 7s ago",
      jira: "synced 10s ago",
      slack: "synced 5s ago",
      monitoring: "synced 22s ago",
    },
    simulationToggles: [
      {
        id: "resolve-blockers",
        label: "Resolve Jira blockers",
        riskImpact: 30,
      },
      { id: "fix-conflicts", label: "Fix merge conflicts", riskImpact: 24 },
      { id: "approve-prs", label: "Approve pending PRs", riskImpact: 12 },
    ],
    slackSignals: [
      "#release: Payment blocker still open",
      "#backend: Auth merge conflict needs owner",
      "#support: Customer-impacting bug linked to release scope",
    ],
  },
  incident: {
    id: "incident",
    label: "Production incident active",
    description: "Incident response should take priority over deployment.",
    version: "v2.8.3",
    previousRiskScore: 74,
    github: {
      totalPRs: 5,
      pendingReviews: 1,
      riskyPRs: 0,
      largePRs: 1,
      filesChanged: 88,
      mergeConflicts: 0,
      reviewStatus: "One observability PR still needs review",
    },
    jira: {
      blockerTickets: 0,
      criticalTickets: 1,
      highTickets: 2,
      openBugs: 4,
      sprintHealth: 86,
    },
    slack: {
      incidentsToday: 1,
      deploymentAlerts: 4,
      pagerDutyAlerts: 1,
      hotfixDiscussions: 3,
    },
    freshness: {
      github: "synced 16s ago",
      jira: "synced 21s ago",
      slack: "synced 4s ago",
      monitoring: "synced 6s ago",
    },
    simulationToggles: [
      { id: "incident-clear", label: "Incident resolved", riskImpact: 30 },
      {
        id: "pager-duty-clear",
        label: "PagerDuty alert cleared",
        riskImpact: 25,
      },
      {
        id: "deployment-alerts-clear",
        label: "Deployment alerts acknowledged",
        riskImpact: 8,
      },
    ],
    slackSignals: [
      "#incidents: SEV-2 checkout latency investigation active",
      "#pagerduty: Primary on-call acknowledged alert",
      "#deployments: Deployment freeze recommended until incident closes",
    ],
  },
  "pr-storm": {
    id: "pr-storm",
    label: "High-risk PR storm",
    description: "Large volume of risky code change shortly before release.",
    version: "v2.8.4",
    previousRiskScore: 79,
    github: {
      totalPRs: 24,
      pendingReviews: 8,
      riskyPRs: 6,
      largePRs: 7,
      filesChanged: 928,
      mergeConflicts: 1,
      reviewStatus: "Review load exceeds release policy threshold",
    },
    jira: {
      blockerTickets: 0,
      criticalTickets: 2,
      highTickets: 8,
      openBugs: 9,
      sprintHealth: 74,
    },
    slack: {
      incidentsToday: 0,
      deploymentAlerts: 2,
      pagerDutyAlerts: 0,
      hotfixDiscussions: 5,
    },
    freshness: {
      github: "synced 5s ago",
      jira: "synced 17s ago",
      slack: "synced 9s ago",
      monitoring: "synced 30s ago",
    },
    simulationToggles: [
      {
        id: "split-release",
        label: "Split risky PRs into next train",
        riskImpact: 28,
      },
      { id: "approve-prs", label: "Complete required reviews", riskImpact: 22 },
      {
        id: "reduce-scope",
        label: "Reduce changed-file scope",
        riskImpact: 12,
      },
    ],
    slackSignals: [
      "#frontend: Large UI refactor merged late",
      "#backend: API migration review still open",
      "#release: Proposal to split release scope",
    ],
  },
};
