import { Grid } from "@mui/material";

import MetricCard from "@/components/common/MetricCard/MetricCard";
import { ReleaseAnalysisResponse } from "@/types/release";

type Props = {
  release: ReleaseAnalysisResponse;
};

export default function ReleaseSourceMetrics({ release }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <MetricCard
          title="GitHub Signal"
          value={`${release.metrics.github.totalPRs} PRs`}
          subtitle={`${release.metrics.github.pendingReviews} pending reviews, ${release.metrics.github.riskyPRs} risky, ${release.metrics.github.filesChanged} files changed`}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <MetricCard
          title="Jira Signal"
          value={`${release.metrics.jira.blockerTickets} Blockers`}
          subtitle={`${release.metrics.jira.criticalTickets} critical, ${release.metrics.jira.openBugs} open bugs, ${release.metrics.jira.sprintHealth}% sprint health`}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <MetricCard
          title="Slack Signal"
          value={`${release.metrics.slack.incidentsToday} Incidents`}
          subtitle={`${release.metrics.slack.deploymentAlerts} alerts, ${release.metrics.slack.pagerDutyAlerts} PagerDuty, ${release.metrics.slack.hotfixDiscussions} hotfix threads`}
        />
      </Grid>
    </Grid>
  );
}
