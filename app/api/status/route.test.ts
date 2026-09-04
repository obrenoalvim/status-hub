import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

function jsonResponse(body: unknown) {
  return { ok: true, status: 200, json: async () => body } as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("GET /api/status", () => {
  it("returns an empty result set when ids is missing", async () => {
    const req = new NextRequest("http://localhost/api/status");
    const res = await GET(req);
    const body = await res.json();
    expect(body.results).toEqual([]);
  });

  it("ignores unknown provider ids", async () => {
    const req = new NextRequest("http://localhost/api/status?ids=not-a-real-provider");
    const res = await GET(req);
    const body = await res.json();
    expect(body.results).toEqual([]);
  });

  it("resolves each known id in the ids query param", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({ page: {}, status: { indicator: "none", description: "All Systems Operational" } })
      )
    );

    const req = new NextRequest("http://localhost/api/status?ids=github,vercel");
    const res = await GET(req);
    const body = await res.json();

    expect(body.results).toHaveLength(2);
    expect(body.results.map((r: { id: string }) => r.id).sort()).toEqual(["github", "vercel"]);
  });
});
