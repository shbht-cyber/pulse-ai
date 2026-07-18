import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AppHeader from "./AppHeader";

describe("AppHeader", () => {
  it("renders product header", () => {
    render(<AppHeader />);

    expect(
      screen.getByText("Release Governance Command Center"),
    ).toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
  });
});
