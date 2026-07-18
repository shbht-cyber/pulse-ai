import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";

export const SOURCE_CARDS = [
  {
    label: "GitHub",
    status: "Mock signal",
    detail: "Pull requests, reviews, risky changes, mergeability",
    icon: GitHubIcon,
  },
  {
    label: "Jira",
    status: "Mock signal",
    detail: "Blockers, critical defects, sprint readiness",
    icon: CloudDoneRoundedIcon,
  },
  {
    label: "Slack",
    status: "Mock signal",
    detail: "Incidents, deployment alerts, hotfix discussions",
    icon: CloudDoneRoundedIcon,
  },
  {
    label: "Monitoring",
    status: "Simulated",
    detail: "Freshness, incident posture, rollback readiness",
    icon: ScheduleRoundedIcon,
  },
];

export const ARCHITECTURE_STEPS = [
  {
    title: "GitHub",
    detail: "PR risk, review gates, merge conflicts",
  },
  {
    title: "Jira",
    detail: "Blockers, critical defects, sprint health",
  },
  {
    title: "Slack",
    detail: "Incident chatter, alerts, hotfix discussions",
  },
  {
    title: "Risk",
    detail: "Deterministic policy score and confidence",
  },
  {
    title: "Decision",
    detail: "Deploy, hold, or escalate verdict",
  },
  {
    title: "OpenAI Review",
    detail: "Executive explanation from agent outputs",
  },
];
