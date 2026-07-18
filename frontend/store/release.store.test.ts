import { beforeEach, describe, expect, it } from "vitest";

import { releaseFixture } from "@/test/fixtures/release";
import { useReleaseStore } from "./release.store";

describe("release store", () => {
  beforeEach(() => {
    useReleaseStore.setState({
      analysis: null,
      assistantHistory: [],
      reportRange: "30d",
      historicalReleases: [],
    });
  });

  it("stores latest analysis and prepends history", () => {
    useReleaseStore.getState().setAnalysis(releaseFixture);

    const state = useReleaseStore.getState();

    expect(state.analysis?.id).toBe("rel-test");
    expect(state.historicalReleases[0].version).toBe("v-test");
  });

  it("tracks assistant messages and report range", () => {
    useReleaseStore.getState().addAssistantMessage({
      id: "msg-1",
      role: "user",
      content: "why hold?",
      createdAt: "now",
    });
    useReleaseStore.getState().setReportRange("7d");

    expect(useReleaseStore.getState().assistantHistory).toHaveLength(1);
    expect(useReleaseStore.getState().reportRange).toBe("7d");
  });

  it("clears active analysis", () => {
    useReleaseStore.getState().setAnalysis(releaseFixture);
    useReleaseStore.getState().clearAnalysis();

    expect(useReleaseStore.getState().analysis).toBeNull();
  });
});
