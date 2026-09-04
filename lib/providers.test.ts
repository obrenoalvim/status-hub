import { describe, expect, it } from "vitest";
import { PROVIDERS, getProvider } from "./providers";

describe("providers", () => {
  it("has no duplicate ids", () => {
    const ids = PROVIDERS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every provider a name, category, base URL and icon slug", () => {
    for (const p of PROVIDERS) {
      expect(p.name).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.icon).toBeTruthy();
      expect(p.baseUrl).toMatch(/^https:\/\//);
    }
  });

  it("getProvider finds an existing provider by id", () => {
    expect(getProvider("github")?.name).toBe("GitHub");
  });

  it("getProvider returns undefined for an unknown id", () => {
    expect(getProvider("not-a-real-provider")).toBeUndefined();
  });
});
