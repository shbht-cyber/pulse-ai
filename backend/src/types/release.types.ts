export type ReleaseStatus = "SAFE" | "WARNING" | "BLOCKED";

export type ReleaseScenario =
  | "safe"
  | "warning"
  | "blocked"
  | "incident"
  | "pr-storm";

export interface GithubAnalysis {
  totalPRs: number;
  pendingReviews: number;
  riskyPRs: number;
  largePRs: number;
  filesChanged: number;
  mergeConflicts: number;
  reviewStatus: string;
}

export interface JiraAnalysis {
  blockerTickets: number;
  criticalTickets: number;
  highTickets: number;
  openBugs: number;
  sprintHealth: number;
}

export interface SlackAnalysis {
  incidentsToday: number;
  deploymentAlerts: number;
  pagerDutyAlerts: number;
  hotfixDiscussions: number;
}

export interface ReleaseMetrics {
  github: GithubAnalysis;
  jira: JiraAnalysis;
  slack: SlackAnalysis;
}

export interface AIAnalysis {
  executiveSummary: string;
  topRisks: string[];
  recommendedActions: string[];
  verdict: string;
  sourceCitations: string[];
}

export interface RiskAnalysis {
  score: number;
  confidence: number;
  rollbackReadinessScore: number;
  blockers: string[];
  warnings: string[];
  deterministicRules: string[];
  confidenceBreakdown: ConfidenceBreakdown;
  summary: string[];
}

export interface ReleaseDecision {
  status: ReleaseStatus;
  reason: string;
  recommendation: string;
  executiveAction: "DEPLOY" | "HOLD" | "ESCALATE";
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

export interface ScenarioOption {
  id: ReleaseScenario;
  label: string;
  description: string;
}

export interface SimulationToggle {
  id: string;
  label: string;
  riskImpact: number;
}

export interface ReleaseScenarioData {
  id: ReleaseScenario;
  label: string;
  description: string;
  version: string;
  github: GithubAnalysis;
  jira: JiraAnalysis;
  slack: SlackAnalysis;
  previousRiskScore: number;
  freshness: SourceFreshness;
  simulationToggles: SimulationToggle[];
  slackSignals: string[];
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
  executiveAction: ReleaseDecision["executiveAction"];
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

export interface AssistantChatRequest {
  message: string;
  analysis: ReleaseAnalysisResponse | null;
}

export interface AnalyzeReleaseRequest {
  scenario?: ReleaseScenario;
}
