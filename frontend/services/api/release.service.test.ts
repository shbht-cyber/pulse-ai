import { beforeEach, describe, expect, it, vi } from "vitest";

import { releaseFixture } from "@/test/fixtures/release";
import { api } from "./axios";
import {
  analyzeRelease,
  chatWithAssistant,
  getLatestRelease,
  getReleaseHistory,
  getReleaseScenarios,
} from "./release.service";

vi.mock("./axios", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockedApi = vi.mocked(api);

describe("release api service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("posts selected scenario for analysis", async () => {
    mockedApi.post.mockResolvedValueOnce({ data: releaseFixture });

    const result = await analyzeRelease("warning");

    expect(mockedApi.post).toHaveBeenCalledWith("/release/analyze", {
      scenario: "warning",
    });
    expect(result.status).toBe("WARNING");
  });

  it("fetches release read models", async () => {
    mockedApi.get
      .mockResolvedValueOnce({ data: [{ id: "safe", label: "Safe", description: "ok" }] })
      .mockResolvedValueOnce({ data: releaseFixture })
      .mockResolvedValueOnce({ data: [releaseFixture] });

    await expect(getReleaseScenarios()).resolves.toHaveLength(1);
    await expect(getLatestRelease()).resolves.toEqual(releaseFixture);
    await expect(getReleaseHistory()).resolves.toHaveLength(1);
  });

  it("posts assistant chat request", async () => {
    mockedApi.post.mockResolvedValueOnce({ data: { reply: "Use GitHub Agent evidence." } });

    const result = await chatWithAssistant({
      message: "why hold?",
      analysis: releaseFixture,
    });

    expect(mockedApi.post).toHaveBeenCalledWith("/assistant/chat", {
      message: "why hold?",
      analysis: releaseFixture,
    });
    expect(result.reply).toContain("GitHub Agent");
  });
});
