import OpenAI from "openai";

import { AssistantChatRequest } from "../../types/release.types";

export class AssistantService {
  async chat({ message, analysis }: AssistantChatRequest): Promise<string> {
    if (!analysis) {
      return "Run a release analysis first so I can answer with the latest GitHub, Jira, Slack, risk, and AI review signals.";
    }

    if (!process.env.OPENAI_API_KEY) {
      return this.fallbackReply(message, analysis);
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: `
You are Pulse AI's release assistant. Answer using only the latest release analysis.
Be concise, practical, and specific.
Always cite which source signal supports your answer, such as "GitHub Agent found..." or "Slack Agent found...".

User question: ${message}

Release analysis:
${JSON.stringify(analysis, null, 2)}
`,
    });

    return response.output_text;
  }

  private fallbackReply(
    message: string,
    analysis: NonNullable<AssistantChatRequest["analysis"]>,
  ) {
    const question = message.toLowerCase();
    const risks = [...analysis.summary, ...analysis.aiAnalysis.topRisks].filter(
      Boolean,
    );

    if (question.includes("block")) {
      return analysis.status === "BLOCKED"
        ? `Deployment is blocked because ${analysis.reason} GitHub/Jira/Slack agent evidence: ${risks.join(", ")}.`
        : `Deployment is not blocked. Decision Agent marked it ${analysis.status} with risk score ${analysis.riskScore}; GitHub Agent found ${analysis.metrics.github.pendingReviews} pending reviews and Slack Agent found ${analysis.metrics.slack.incidentsToday} active incidents.`;
    }

    if (question.includes("fix") || question.includes("before")) {
      return `Focus on these before deployment: ${analysis.fixPlan.map((item) => `${item.action} (${item.source}, owner: ${item.owner})`).join("; ") || analysis.recommendation}`;
    }

    if (question.includes("risk") || question.includes("pr")) {
      return `The release risk is ${analysis.riskScore}/100. GitHub Agent found ${analysis.metrics.github.pendingReviews} pending review(s), ${analysis.metrics.github.riskyPRs} risky PR(s), ${analysis.metrics.github.largePRs} large PR(s), and ${analysis.metrics.github.filesChanged} changed files. Risk Agent then applied deterministic rules to calculate the score.`;
    }

    return `${analysis.aiAnalysis.executiveSummary} Recommendation: ${analysis.recommendation} Source citations: ${analysis.aiAnalysis.sourceCitations.join(", ")}.`;
  }
}
