import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
  it.each(["SAFE", "WARNING", "BLOCKED"] as const)("renders %s", (status) => {
    render(<StatusBadge status={status} />);

    expect(screen.getByText(status)).toBeInTheDocument();
  });
});
