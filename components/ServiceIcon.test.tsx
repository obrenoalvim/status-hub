import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ServiceIcon from "./ServiceIcon";

describe("ServiceIcon", () => {
  it("falls back to a letter avatar when the icon already failed to load before hydration", () => {
    // Simulates a 404 that resolves before React attaches `onError` — the
    // native error event fires with no listener, so `complete` is true and
    // `naturalWidth` is 0 by the time the component mounts.
    vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(true);
    vi.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(0);

    const { container } = render(<ServiceIcon slug="not-a-real-icon" name="Twilio" />);

    expect(screen.getByText("T")).toBeTruthy();
    expect(container.querySelector("img")).toBeNull();
  });

  it("renders the image when it loads successfully", () => {
    vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(true);
    vi.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(24);

    const { container } = render(<ServiceIcon slug="github" name="GitHub" />);

    expect(container.querySelector("img")?.getAttribute("src")).toBe("https://cdn.simpleicons.org/github");
  });
});
