import { Provider } from "./providers";

export type Indicator = "operational" | "minor" | "major" | "critical" | "maintenance" | "unknown";

export interface StatusResult {
  id: string;
  name: string;
  indicator: Indicator;
  description: string;
  updatedAt: string | null;
  url: string;
}

function unreachable(provider: Provider): StatusResult {
  return {
    id: provider.id,
    name: provider.name,
    indicator: "unknown",
    description: "Unable to reach status endpoint",
    updatedAt: null,
    url: provider.baseUrl,
  };
}

// Most providers (Statuspage.io/Atlassian) send `s-maxage=10` at the edge:
// the origin only refreshes the data every 10s, so polling faster than that
// never returns anything fresher. We reuse that window for Next's fetch
// cache so we neither hammer the origin nor lag behind it.
const REVALIDATE_SECONDS = 10;

async function fetchJson(url: string) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(8000),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const STATUSPAGE_INDICATOR: Record<string, Indicator> = {
  none: "operational",
  minor: "minor",
  major: "major",
  critical: "critical",
  maintenance: "maintenance",
};

async function fetchStatuspage(provider: Provider): Promise<StatusResult> {
  const data = await fetchJson(`${provider.baseUrl}/api/v2/status.json`);
  return {
    id: provider.id,
    name: provider.name,
    indicator: STATUSPAGE_INDICATOR[data?.status?.indicator] ?? "unknown",
    description: data?.status?.description ?? "Unknown",
    updatedAt: data?.page?.updated_at ?? null,
    url: provider.baseUrl,
  };
}

interface GcloudIncident {
  end?: string | null;
  severity?: string;
}

async function fetchGcloud(provider: Provider): Promise<StatusResult> {
  const data: GcloudIncident[] = await fetchJson(`${provider.baseUrl}/incidents.json`);
  const open = data.filter((i) => !i.end);
  const hasHigh = open.some((i) => i.severity === "high");
  return {
    id: provider.id,
    name: provider.name,
    indicator: open.length === 0 ? "operational" : hasHigh ? "major" : "minor",
    description: open.length === 0 ? "All Systems Operational" : `${open.length} open incident(s)`,
    updatedAt: new Date().toISOString(),
    url: provider.baseUrl,
  };
}

export async function fetchProviderStatus(provider: Provider): Promise<StatusResult> {
  try {
    switch (provider.type) {
      case "statuspage":
        return await fetchStatuspage(provider);
      case "gcloud":
        return await fetchGcloud(provider);
    }
  } catch {
    return unreachable(provider);
  }
}
