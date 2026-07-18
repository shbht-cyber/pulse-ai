import OpenAI from "openai";

export type AIAnalysis = {
  executiveSummary: string;
  topRisks: string[];
  recommendedActions: string[];
  verdict: string;
  sourceCitations: string[];
};

export class OpenAIAgent {
  async analyze(input: {
    github: {
      totalPRs: number;
      pendingReviews: number;
      riskyPRs: number;
      largePRs: number;
      filesChanged: number;
      mergeConflicts: number;
      reviewStatus: string;
    };
    jira: {
      blockerTickets: number;
      criticalTickets: number;
      highTickets: number;
      openBugs: number;
      sprintHealth: number;
    };
    slack: {
      incidentsToday: number;
      deploymentAlerts: number;
      pagerDutyAlerts: number;
      hotfixDiscussions: number;
    };
    riskScore: number;
    confidence: number;
    status: string;
  }): Promise<AIAnalysis> {
    if (!process.env.OPENAI_API_KEY) {
      return {
        executiveSummary:
          "Pulse AI found non-blocking release risk across code review, Jira quality, and deployment discussion signals.",
        topRisks: [
          `${input.github.pendingReviews} pull request(s) still need review`,
          `${input.jira.criticalTickets} critical Jira ticket(s) remain open`,
          `${input.slack.hotfixDiscussions} hotfix discussion(s) are active`,
        ],
        recommendedActions: [
          "Close pending pull request reviews",
          "Confirm the critical Jira issue owner and resolution path",
          "Review hotfix threads before the release window",
        ],
        verdict: input.status,
        sourceCitations: [
          "GitHub Agent: pull request review and churn signals",
          "Jira Agent: blocker and critical ticket signals",
          "Slack Agent: incident and hotfix discussion signals",
        ],
      };
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are a Principal Release Engineering AI.

Analyze the following release.

GitHub

Total PRs: ${input.github.totalPRs}

Pending Reviews: ${input.github.pendingReviews}

Risky PRs: ${input.github.riskyPRs}
Large PRs: ${input.github.largePRs}
Files Changed: ${input.github.filesChanged}
Merge Conflicts: ${input.github.mergeConflicts}
Review Status: ${input.github.reviewStatus}

Jira

Blockers: ${input.jira.blockerTickets}

Critical: ${input.jira.criticalTickets}

High: ${input.jira.highTickets}
Open Bugs: ${input.jira.openBugs}
Sprint Health: ${input.jira.sprintHealth}

Slack

Incidents: ${input.slack.incidentsToday}

Deployment Alerts: ${input.slack.deploymentAlerts}
PagerDuty Alerts: ${input.slack.pagerDutyAlerts}
Hotfix Discussions: ${input.slack.hotfixDiscussions}

Risk Score: ${input.riskScore}

Confidence: ${input.confidence}

Status: ${input.status}

Return ONLY valid JSON.

{
 "executiveSummary":"",
 "topRisks":["",""],
 "recommendedActions":["",""],
 "verdict":"",
 "sourceCitations":["",""]
}
`;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    return this.parseJson(response.output_text, input.status);
  }

  private parseJson(text: string, status: string): AIAnalysis {
    try {
      const parsed = JSON.parse(text) as Partial<AIAnalysis>;

      return {
        executiveSummary:
          parsed.executiveSummary ??
          "AI reviewer summarized the deterministic release decision.",
        topRisks: parsed.topRisks ?? [],
        recommendedActions: parsed.recommendedActions ?? [],
        verdict: parsed.verdict ?? status,
        sourceCitations: parsed.sourceCitations ?? [
          "GitHub Agent",
          "Jira Agent",
          "Slack Agent",
          "Risk Agent",
        ],
      };
    } catch {
      return {
        executiveSummary:
          "AI reviewer could not return strict JSON, so Pulse AI preserved the deterministic decision and fallback explanation.",
        topRisks: [],
        recommendedActions: ["Review deterministic risk rules and agent trace."],
        verdict: status,
        sourceCitations: ["Deterministic policy engine"],
      };
    }
  }
}
