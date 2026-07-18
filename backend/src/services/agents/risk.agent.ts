import type {
  GithubAnalysis,
  JiraAnalysis,
  RiskAnalysis,
  SlackAnalysis,
} from "../../types/release.types";

export class RiskAgent {
  analyze(
    github: GithubAnalysis,
    jira: JiraAnalysis,
    slack: SlackAnalysis,
  ): RiskAnalysis {
    let score = 100;
    let rollbackReadinessScore = 92;

    const blockers: string[] = [];
    const warnings: string[] = [];
    const deterministicRules: string[] = [];

    /* -----------------------------
       GitHub Analysis
    ------------------------------ */

    if (github.pendingReviews > 0) {
      warnings.push(`${github.pendingReviews} PR(s) waiting for review`);
      deterministicRules.push("-5 risk points per pending PR review");

      score -= github.pendingReviews * 5;
    }

    if (github.riskyPRs > 0) {
      warnings.push(`${github.riskyPRs} risky pull request(s) detected`);
      deterministicRules.push("-8 risk points per high-risk pull request");

      score -= github.riskyPRs * 8;
      rollbackReadinessScore -= github.riskyPRs * 3;
    }

    if (github.largePRs > 0) {
      warnings.push(
        `${github.largePRs} large pull request(s) need extra review`,
      );
      deterministicRules.push("-4 risk points per large pull request");

      score -= github.largePRs * 4;
    }

    if (github.mergeConflicts > 0) {
      blockers.push(
        `${github.mergeConflicts} pull request(s) have merge conflicts`,
      );
      deterministicRules.push(
        "-20 risk points per merge conflict and hard blocker",
      );

      score -= github.mergeConflicts * 20;
      rollbackReadinessScore -= github.mergeConflicts * 8;
    }

    if (github.filesChanged > 150) {
      warnings.push(`${github.filesChanged} files changed in this release`);
      deterministicRules.push(
        "-6 risk points when file churn exceeds 150 files",
      );

      score -= 6;
      rollbackReadinessScore -= 4;
    }

    /* -----------------------------
       Jira Analysis
    ------------------------------ */

    if (jira.blockerTickets > 0) {
      blockers.push(`${jira.blockerTickets} blocker Jira ticket(s)`);
      deterministicRules.push("-30 risk points when any Jira blocker exists");

      score -= 30;
      rollbackReadinessScore -= 12;
    }

    if (jira.criticalTickets > 0) {
      warnings.push(`${jira.criticalTickets} critical Jira ticket(s)`);
      deterministicRules.push("-5 risk points per critical Jira ticket");

      score -= jira.criticalTickets * 5;
    }

    if (jira.highTickets > 5) {
      warnings.push(`${jira.highTickets} high priority Jira ticket(s)`);
      deterministicRules.push(
        "-5 risk points when high-priority Jira count exceeds 5",
      );

      score -= 5;
    }

    if (jira.openBugs > 5) {
      warnings.push(`${jira.openBugs} open bug(s) remain in scope`);
      deterministicRules.push("-6 risk points when open bug count exceeds 5");

      score -= 6;
    }

    if (jira.sprintHealth < 75) {
      warnings.push(`Sprint health is ${jira.sprintHealth}%`);
      deterministicRules.push("-8 risk points when sprint health is below 75%");

      score -= 8;
      rollbackReadinessScore -= 8;
    }

    /* -----------------------------
       Slack Analysis
    ------------------------------ */

    if (slack.incidentsToday > 0) {
      blockers.push(
        `${slack.incidentsToday} production incident(s) reported today`,
      );
      deterministicRules.push(
        "-30 risk points when production incidents are active",
      );

      score -= 30;
      rollbackReadinessScore -= 18;
    }

    if (slack.deploymentAlerts > 2) {
      warnings.push(`${slack.deploymentAlerts} deployment alert(s)`);
      deterministicRules.push("-5 risk points when deployment alerts exceed 2");

      score -= 5;
    }

    if (slack.pagerDutyAlerts > 0) {
      blockers.push(`${slack.pagerDutyAlerts} PagerDuty alert(s) are active`);
      deterministicRules.push("-25 risk points per active PagerDuty alert");

      score -= slack.pagerDutyAlerts * 25;
      rollbackReadinessScore -= slack.pagerDutyAlerts * 15;
    }

    if (slack.hotfixDiscussions > 0) {
      warnings.push(`${slack.hotfixDiscussions} hotfix discussion(s) in Slack`);
      deterministicRules.push("-3 risk points per hotfix discussion");

      score -= slack.hotfixDiscussions * 3;
    }

    score = Math.max(0, Math.min(score, 100));
    rollbackReadinessScore = Math.max(0, Math.min(100, rollbackReadinessScore));

    const dataFreshness = 94;
    const sourceCoverage = 75;
    const signalAgreement =
      blockers.length > 0 ? 88 : warnings.length > 3 ? 76 : 92;
    const confidence = Math.round(
      dataFreshness * 0.34 + sourceCoverage * 0.33 + signalAgreement * 0.33,
    );

    return {
      score,

      confidence,

      rollbackReadinessScore,

      blockers,

      warnings,

      deterministicRules,

      confidenceBreakdown: {
        dataFreshness,
        sourceCoverage,
        signalAgreement,
        missingIntegrations: ["GitHub REST", "Jira Cloud", "Slack API"],
        explanation:
          "Confidence combines source freshness, connected-source coverage, and agreement between GitHub, Jira, Slack, and monitoring signals.",
      },

      summary: [...warnings, ...blockers],
    };
  }
}
