export type ReleaseStatus = "SAFE" | "WARNING" | "BLOCKED";

export type ReleaseScenario =
  | "safe"
  | "warning"
  | "blocked"
  | "incident"
  | "pr-storm";

export interface GithubMetrics {
  totalPRs: number;
  pendingReviews: number;
  riskyPRs: number;
  largePRs: number;
  filesChanged: number;
  mergeConflicts: number;
  reviewStatus: string;
}

export interface JiraMetrics {
  blockerTickets: number;
  criticalTickets: number;
  highTickets: number;
  openBugs: number;
  sprintHealth: number;
}

export interface SlackMetrics {
  incidentsToday: number;
  deploymentAlerts: number;
  pagerDutyAlerts: number;
  hotfixDiscussions: number;
}

export interface ReleaseMetrics {
  github: GithubMetrics;
  jira: JiraMetrics;
  slack: SlackMetrics;
}

export interface AIAnalysis {
  executiveSummary: string;
  topRisks: string[];
  recommendedActions: string[];
  verdict: string;
  sourceCitations: string[];
}

export interface AgentTraceItem {
  agent: string;
  status: ReleaseStatus;
  summary: string;
  findings: string[];
  evidence: string[];
}

export interface ReadinessCheck {
  label: string;
  passed: boolean;
  source: string;
}

export interface FixPlanItem {
  action: string;
  owner: string;
  priority: "P0" | "P1" | "P2";
  source: string;
  expectedRiskImpact: number;
}

export interface ConfidenceBreakdown {
  dataFreshness: number;
  sourceCoverage: number;
  signalAgreement: number;
  missingIntegrations: string[];
  explanation: string;
}

export interface ChangeSummary {
  label: string;
  direction: "up" | "down" | "neutral";
  detail: string;
}

export interface SourceFreshness {
  github: string;
  jira: string;
  slack: string;
  monitoring: string;
}

export interface AgentDebateItem {
  agent: string;
  vote: ReleaseStatus;
  rationale: string;
}

export interface ApprovalAction {
  label: string;
  intent: "approve" | "block" | "fix" | "notify";
  description: string;
}

export interface SimulationToggle {
  id: string;
  label: string;
  riskImpact: number;
}

export interface ScenarioOption {
  id: ReleaseScenario;
  label: string;
  description: string;
}

export interface ReleaseAnalysisResponse {
  id: string;
  scenario: ReleaseScenario;
  scenarioLabel: string;
  version: string;
  status: ReleaseStatus;
  riskScore: number;
  confidence: number;
  rollbackReadinessScore: number;
  reason: string;
  recommendation: string;
  executiveAction: "DEPLOY" | "HOLD" | "ESCALATE";
  metrics: ReleaseMetrics;
  summary: string[];
  aiAnalysis: AIAnalysis;
  agentTrace: AgentTraceItem[];
  deterministicRules: string[];
  readinessChecklist: ReadinessCheck[];
  fixPlan: FixPlanItem[];
  confidenceBreakdown: ConfidenceBreakdown;
  changeSummary: ChangeSummary[];
  sourceFreshness: SourceFreshness;
  agentDebate: AgentDebateItem[];
  warRoomSummary: string;
  approvalActions: ApprovalAction[];
  simulationToggles: SimulationToggle[];
  estimatedTimeToUnblock: string;
  integrationRoadmap: string[];
  slackSignals: string[];
  analyzedAt: string;
}

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export type ReportRange = "7d" | "30d" | "90d";

export interface HistoricalRelease {
  id: string;
  version: string;
  status: ReleaseStatus;
  riskScore: number;
  confidence: number;
  analyzedAt: string;
}
