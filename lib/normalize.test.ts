import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchProviderStatus } from "./normalize";
import type { Provider } from "./providers";

const statuspageProvider: Provider = {
  id: "github",
  name: "GitHub",
  category: "Dev Tools",
  type: "statuspage",
  baseUrl: "https://www.githubstatus.com",
  icon: "github",
};

const gcloudProvider: Provider = {
  id: "gcloud",
  name: "Google Cloud",
  category: "Infra",
  type: "gcloud",
  baseUrl: "https://status.cloud.google.com",
  icon: "googlecloud",
};

function jsonResponse(body: unknown, ok = true) {
  return {
    ok,
    status: ok ? 200 : 500,
    json: async () => body,
  } as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchProviderStatus — statuspage adapter", () => {
  it("maps a healthy response to the operational indicator", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          page: { updated_at: "2026-01-01T00:00:00Z" },
          status: { indicator: "none", description: "All Systems Operational" },
        })
      )
    );

    const result = await fetchProviderStatus(statuspageProvider);

    expect(result).toEqual({
      id: "github",
      name: "GitHub",
      indicator: "operational",
      description: "All Systems Operational",
      updatedAt: "2026-01-01T00:00:00Z",
      url: "https://www.githubstatus.com",
    });
  });

  it("maps every known statuspage indicator", async () => {
    const cases: [string, string][] = [
      ["minor", "minor"],
      ["major", "major"],
      ["critical", "critical"],
      ["maintenance", "maintenance"],
    ];

    for (const [raw, expected] of cases) {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(jsonResponse({ page: {}, status: { indicator: raw, description: raw } }))
      );
      const result = await fetchProviderStatus(statuspageProvider);
      expect(result.indicator).toBe(expected);
    }
  });

  it("falls back to unknown when the fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const result = await fetchProviderStatus(statuspageProvider);

    expect(result.indicator).toBe("unknown");
    expect(result.updatedAt).toBeNull();
  });

  it("falls back to unknown on a non-2xx response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({}, false)));

    const result = await fetchProviderStatus(statuspageProvider);

    expect(result.indicator).toBe("unknown");
  });
});

describe("fetchProviderStatus — gcloud adapter", () => {
  it("reports operational when there are no open incidents", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse([{ end: "2026-01-01T00:00:00Z" }])));

    const result = await fetchProviderStatus(gcloudProvider);

    expect(result.indicator).toBe("operational");
    expect(result.description).toBe("All Systems Operational");
  });

  it("reports minor when incidents are open but none are high severity", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse([{ end: null, severity: "medium" }])));

    const result = await fetchProviderStatus(gcloudProvider);

    expect(result.indicator).toBe("minor");
    expect(result.description).toBe("1 open incident(s)");
  });

  it("reports major when an open incident is high severity", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse([{ end: null, severity: "high" }, { end: null, severity: "low" }]))
    );

    const result = await fetchProviderStatus(gcloudProvider);

    expect(result.indicator).toBe("major");
    expect(result.description).toBe("2 open incident(s)");
  });
});
