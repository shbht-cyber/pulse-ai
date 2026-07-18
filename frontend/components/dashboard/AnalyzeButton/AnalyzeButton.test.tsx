import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AnalyzeButton from "./AnalyzeButton";

describe("AnalyzeButton", () => {
  it("runs click handler when ready", () => {
    const onClick = vi.fn();

    render(<AnalyzeButton loading={false} onClick={onClick} />);
    fireEvent.click(
      screen.getByRole("button", { name: /analyze release risk/i }),
    );

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state as disabled", () => {
    render(<AnalyzeButton loading onClick={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /running agent analysis/i }),
    ).toBeDisabled();
  });
});
