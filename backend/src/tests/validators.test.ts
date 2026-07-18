import assert from "node:assert/strict";

import {
  analyzeReleaseSchema,
  assistantChatSchema,
} from "../validators/release.validator";
import { runSuite } from "./test-utils";

export async function runValidatorTests() {
  await runSuite("validators", [
    {
      name: "accepts valid release scenarios",
      run() {
        assert.equal(
          analyzeReleaseSchema.safeParse({ scenario: "safe" }).success,
          true,
        );
      },
    },
    {
      name: "rejects invalid release scenarios",
      run() {
        assert.equal(
          analyzeReleaseSchema.safeParse({ scenario: "unknown" }).success,
          false,
        );
      },
    },
    {
      name: "requires assistant message text",
      run() {
        assert.equal(
          assistantChatSchema.safeParse({ message: "", analysis: null }).success,
          false,
        );
      },
    },
  ]);
}
