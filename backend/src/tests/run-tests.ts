import { runAssistantServiceTests } from "./assistant-service.test";
import { runDecisionAgentTests } from "./decision-agent.test";
import { runReleaseBuilderTests } from "./release-builders.test";
import { runReleaseServiceTests } from "./release-service.test";
import { runRiskAgentTests } from "./risk-agent.test";
import { runSourceAgentTests } from "./source-agents.test";
import { runValidatorTests } from "./validators.test";

async function run() {
  await runSourceAgentTests();
  await runRiskAgentTests();
  await runDecisionAgentTests();
  await runReleaseBuilderTests();
  await runReleaseServiceTests();
  await runAssistantServiceTests();
  await runValidatorTests();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
