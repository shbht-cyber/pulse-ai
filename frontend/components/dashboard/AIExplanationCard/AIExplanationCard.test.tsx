import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { releaseFixture } from "@/test/fixtures/release";
import AIExplanationCard from "./AIExplanationCard";

describe("AIExplanationCard", () => {
  it("renders executive summary, risks, actions, and sources", () => {
    render(<AIExplanationCard analysis={releaseFixture.aiAnalysis} />);

    expect(screen.getByText("AI Executive Interpretation")).toBeInTheDocument();
    expect(screen.getByText("Release has review risk.")).toBeInTheDocument();
    expect(screen.getByText("Pending PR reviews")).toBeInTheDocument();
    expect(screen.getByText("Close pending reviews")).toBeInTheDocument();
    expect(screen.getByText("GitHub Agent")).toBeInTheDocument();
  });
});
