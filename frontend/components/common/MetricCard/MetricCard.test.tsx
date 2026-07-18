import { render, screen } from "@testing-library/react";

import MetricCard from "./MetricCard";

describe("MetricCard", () => {
  it("renders title, value, and subtitle", () => {
    render(<MetricCard title="Risk Score" value={72} subtitle="Warning" />);

    expect(screen.getByText("Risk Score")).toBeInTheDocument();
    expect(screen.getByText("72")).toBeInTheDocument();
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });
});
