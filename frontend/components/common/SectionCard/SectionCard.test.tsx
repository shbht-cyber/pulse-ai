import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SectionCard from "./SectionCard";

describe("SectionCard", () => {
  it("renders title and children", () => {
    render(
      <SectionCard title="Agent Trace">GitHub Agent evidence</SectionCard>,
    );

    expect(screen.getByText("Agent Trace")).toBeInTheDocument();
    expect(screen.getByText("GitHub Agent evidence")).toBeInTheDocument();
  });
});
