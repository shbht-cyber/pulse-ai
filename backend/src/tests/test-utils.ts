import assert from "node:assert/strict";

export type TestCase = {
  name: string;
  run: () => void | Promise<void>;
};

export async function runSuite(name: string, tests: TestCase[]) {
  for (const test of tests) {
    await test.run();
    assert.ok(true, `${name}: ${test.name}`);
  }
}
