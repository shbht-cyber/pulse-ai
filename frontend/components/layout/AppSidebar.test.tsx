import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AppSidebar from "./AppSidebar";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({ push }),
}));

describe("AppSidebar", () => {
  it("renders navigation and routes on click", () => {
    render(<AppSidebar />);

    expect(screen.getByText("PulseAI")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Release Report"));

    expect(push).toHaveBeenCalledWith("/releases");
  });
});
