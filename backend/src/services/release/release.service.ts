import { DecisionAgent } from "../agents/decision.agent";
import { GithubAgent } from "../agents/github.agent";
import { JiraAgent } from "../agents/jira.agent";
import { OpenAIAgent } from "../agents/openai.agent";
import { RiskAgent } from "../agents/risk.agent";
import { SlackAgent } from "../agents/slack.agent";

import {
  addReleaseHistory,
  getLatestRelease,
  getReleaseHistory,
} from "./history.store";
import {
  buildAgentDebate,
  buildAgentTrace,
  buildApprovalActions,
  buildChangeSummary,
  buildFixPlan,
  buildReadinessChecklist,
  buildWarRoomSummary,
  estimateTimeToUnblock,
  integrationRoadmap,
} from "./builders";

import { releaseScenarios, scenarioOptions } from "../../mocks/scenarios.mock";

import type {
  AnalyzeReleaseRequest,
  ReleaseAnalysisResponse,
  ReleaseScenario,
} from "../../types/release.types";

export class ReleaseService {
  private seeded = false;

  private readonly githubAgent = new GithubAgent();

  private readonly jiraAgent = new JiraAgent();

  private readonly slackAgent = new SlackAgent();

  private readonly riskAgent = new RiskAgent();

  private readonly decisionAgent = new DecisionAgent();

  private readonly openaiAgent = new OpenAIAgent();

  getScenarios() {
    return scenarioOptions;
  }

  async getHistory() {
    await this.ensureSeededHistory();

    return getReleaseHistory();
  }

  async getLatest() {
    await this.ensureSeededHistory();

    return getLatestRelease();
  }

  async analyzeRelease(
    input: AnalyzeReleaseRequest = {},
    options: { skipAi?: boolean } = {},
  ): Promise<ReleaseAnalysisResponse> {
    const scenarioId = input.scenario ?? "warning";
    const scenario = releaseScenarios[scenarioId] ?? releaseScenarios.warning;

    const [github, jira, slack] = await Promise.all([
      this.githubAgent.analyze(scenario.github),
      this.jiraAgent.analyze(scenario.jira),
      this.slackAgent.analyze(scenario.slack),
    ]);

    const risk = this.riskAgent.analyze(github, jira, slack);
    const decision = this.decisionAgent.decide(risk);
    const agentTrace = buildAgentTrace(decision.status, risk, scenarioId);
    const readinessChecklist = buildReadinessChecklist(
      decision.status,
      scenarioId,
    );
    const fixPlan = buildFixPlan(decision.status, scenarioId);
    const agentDebate = buildAgentDebate(decision.status, scenarioId);
    const changeSummary = buildChangeSummary(
      scenario.previousRiskScore,
      risk.score,
      scenarioId,
    );
    const approvalActions = buildApprovalActions(decision.status);

    let aiAnalysis = {
      executiveSummary: "AI analysis is currently unavailable.",
      topRisks: [] as string[],
      recommendedActions: [] as string[],
      verdict: "Unable to generate AI verdict.",
      sourceCitations: [] as string[],
    };

    if (!options.skipAi) {
      try {
        aiAnalysis = await this.openaiAgent.analyze({
          github,
          jira,
          slack,
          riskScore: risk.score,
          confidence: risk.confidence,
          status: decision.status,
        });
      } catch (error) {
        console.error("OpenAI Agent Error:", error);
      }
    } else {
      aiAnalysis = {
        executiveSummary:
          "Seeded mock analysis generated from deterministic agent outputs.",
        topRisks: risk.summary.slice(0, 3),
        recommendedActions: buildFixPlan(decision.status, scenarioId)
          .slice(0, 3)
          .map((item) => item.action),
        verdict: decision.status,
        sourceCitations: [
          "GitHub Agent",
          "Jira Agent",
          "Slack Agent",
          "Risk Agent",
        ],
      };
    }

    const analysis: ReleaseAnalysisResponse = {
      id: `rel-${scenario.id}-${Date.now()}`,
      scenario: scenario.id,
      scenarioLabel: scenario.label,
      version: scenario.version,
      status: decision.status,
      riskScore: risk.score,
      confidence: risk.confidence,
      rollbackReadinessScore: risk.rollbackReadinessScore,
      reason: decision.reason,
      recommendation: decision.recommendation,
      executiveAction: decision.executiveAction,
      metrics: {
        github,
        jira,
        slack,
      },
      summary: risk.summary,
      aiAnalysis,
      agentTrace,
      deterministicRules: risk.deterministicRules,
      readinessChecklist,
      fixPlan,
      confidenceBreakdown: risk.confidenceBreakdown,
      changeSummary,
      sourceFreshness: scenario.freshness,
      agentDebate,
      warRoomSummary: buildWarRoomSummary(
        scenario.version,
        decision.status,
        risk.summary,
        fixPlan,
      ),
      approvalActions,
      simulationToggles: scenario.simulationToggles,
      estimatedTimeToUnblock: estimateTimeToUnblock(
        decision.status,
        fixPlan,
      ),
      integrationRoadmap,
      slackSignals: scenario.slackSignals,
      analyzedAt: new Date().toISOString(),
    };

    addReleaseHistory(analysis);

    return analysis;
  }

  private async ensureSeededHistory() {
    if (this.seeded || getReleaseHistory().length > 0) {
      return;
    }

    this.seeded = true;

    for (const scenario of [
      "safe",
      "warning",
      "blocked",
    ] as ReleaseScenario[]) {
      await this.analyzeRelease({ scenario }, { skipAi: true });
    }
  }
}
