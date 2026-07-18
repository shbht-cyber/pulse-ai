import assert from "node:assert/strict";

import { ReleaseService } from "../services/release/release.service";
import { runSuite } from "./test-utils";

export async function runReleaseServiceTests() {
  const service = new ReleaseService();

  await runSuite("release service", [
    {
      name: "returns scenario options",
      run() {
        assert.ok(service.getScenarios().length >= 5);
      },
    },
    {
      name: "analyzes selected release scenario",
      async run() {
        const analysis = await service.analyzeRelease(
          { scenario: "blocked" },
          { skipAi: true },
        );

        assert.equal(analysis.status, "BLOCKED");
        assert.equal(analysis.executiveAction, "ESCALATE");
        assert.ok(analysis.fixPlan.length > 0);
        assert.ok(analysis.agentTrace.length > 0);
      },
    },
    {
      name: "uses OpenAI fallback when no key is configured",
      async run() {
        const previousKey = process.env.OPENAI_API_KEY;
        delete process.env.OPENAI_API_KEY;

        try {
          const analysis = await service.analyzeRelease({ scenario: "warning" });

          assert.equal(analysis.aiAnalysis.verdict, "WARNING");
          assert.ok(
            analysis.aiAnalysis.sourceCitations.some((citation) =>
              citation.includes("GitHub Agent"),
            ),
          );
        } finally {
          process.env.OPENAI_API_KEY = previousKey;
        }
      },
    },
    {
      name: "seeds latest and history",
      async run() {
        const latest = await service.getLatest();
        const history = await service.getHistory();

        assert.ok(latest);
        assert.ok(history.length > 0);
      },
    },
  ]);
}
