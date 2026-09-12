import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatusCard from "./StatusCard";
import type { StatusResult } from "@/lib/normalize";

function makeStatus(overrides: Partial<StatusResult> = {}): StatusResult {
  return {
    id: "github",
    name: "GitHub",
    indicator: "operational",
    description: "All Systems Operational",
    updatedAt: "2026-01-01T00:00:00Z",
    url: "https://www.githubstatus.com",
    ...overrides,
  };
}

describe("StatusCard", () => {
  it("renders the provider name, description, and a link to its status page", () => {
    render(<StatusCard status={makeStatus()} icon="github" />);

    expect(screen.getByText("GitHub")).toBeTruthy();
    expect(screen.getByText("All Systems Operational")).toBeTruthy();

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("https://www.githubstatus.com");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noreferrer");
  });

  it("colors the status dot according to the indicator", () => {
    const { container } = render(
      <StatusCard status={makeStatus({ indicator: "critical", description: "Major outage" })} icon="github" />
    );

    const dot = container.querySelector(".led");
    expect(dot?.getAttribute("style")).toContain("var(--led-critical)");
  });
});
