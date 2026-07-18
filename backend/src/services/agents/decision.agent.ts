import { ReleaseDecision, RiskAnalysis } from "../../types/release.types";

export class DecisionAgent {
  decide(risk: RiskAnalysis): ReleaseDecision {
    if (risk.blockers.length > 0) {
      return {
        status: "BLOCKED",

        reason: "Critical deployment blockers detected.",

        recommendation:
          "Deployment should not proceed until all blockers are resolved.",

        executiveAction: "ESCALATE",
      };
    }

    if (risk.score >= 85 && risk.blockers.length === 0) {
      return {
        status: "SAFE",

        reason: "No critical risks detected.",

        recommendation: "Deployment can safely proceed.",

        executiveAction: "DEPLOY",
      };
    }

    return {
      status: "WARNING",

      reason: "Deployment contains non-blocking risks.",

      recommendation: "Review warnings before deploying.",

      executiveAction: "HOLD",
    };
  }
}
