import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  it("renders title and subtitle", () => {
    render(<PageHeader title="Command Center" subtitle="Release governance" />);

    expect(
      screen.getByRole("heading", { name: "Command Center" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Release governance")).toBeInTheDocument();
  });
});
