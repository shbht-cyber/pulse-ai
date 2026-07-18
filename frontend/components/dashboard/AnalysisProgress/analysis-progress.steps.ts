import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import ReportRoundedIcon from "@mui/icons-material/ReportRounded";

export const ANALYSIS_STEPS = [
  {
    title: "Normalizing release signals",
    detail: "Preparing mocked GitHub, Jira, Slack, and monitoring evidence",
    icon: CloudQueueRoundedIcon,
  },
  {
    title: "Evaluating pull request risk",
    detail:
      "Checking review gates, risky changes, file churn, and mergeability",
    icon: GitHubIcon,
  },
  {
    title: "Assessing Jira readiness",
    detail:
      "Reviewing blockers, critical defects, sprint health, and open scope",
    icon: BugReportRoundedIcon,
  },
  {
    title: "Interpreting collaboration signals",
    detail:
      "Scanning incident chatter, deployment alerts, and hotfix discussions",
    icon: ForumRoundedIcon,
  },
  {
    title: "Applying deterministic policy",
    detail:
      "Risk Agent computes score, confidence, blockers, and rollback posture",
    icon: InsightsRoundedIcon,
  },
  {
    title: "Generating AI executive review",
    detail:
      "OpenAI Reviewer explains the deterministic decision from agent outputs",
    icon: AutoAwesomeRoundedIcon,
  },
  {
    title: "Assembling command report",
    detail:
      "Packaging verdict, evidence, fix plan, simulator, and war-room summary",
    icon: ReportRoundedIcon,
  },
];
