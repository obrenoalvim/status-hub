"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import StatusCard from "@/components/StatusCard";
import { StatusResult } from "@/lib/normalize";
import { getProvider } from "@/lib/providers";
import { useSelectedProviders } from "@/lib/useSelectedProviders";

// Statuspage.io (most providers) only refreshes data every 10s at the edge
// (s-maxage=10). 12s gives us a margin to always get the newest value
// without hammering the origin for nothing.
const REFRESH_MS = 12_000;

const SEVERITY_LABEL: Record<string, string> = {
  minor: "minor",
  major: "major",
  critical: "critical",
  maintenance: "maintenance",
  unknown: "unreachable",
};

export default function DashboardPage() {
  const { selected } = useSelectedProviders();
  const [results, setResults] = useState<StatusResult[]>([]);
  const [fetching, setFetching] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = useCallback(async (ids: string[]) => {
    if (ids.length === 0) {
      setResults([]);
      return;
    }
    setFetching(true);
    try {
      const res = await fetch(`/api/status?ids=${ids.join(",")}`);
      const data = await res.json();
      setResults(data.results ?? []);
      setLastFetched(new Date());
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    // Fetch-on-dependency-change: React's own documented pattern for
    // effects that synchronize with an external system (the status API).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh(selected);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => refresh(selected), REFRESH_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [selected, refresh]);

  const problems = results.filter((r) => r.indicator !== "operational");

  const severityCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of problems) {
      counts.set(p.indicator, (counts.get(p.indicator) ?? 0) + 1);
    }
    return [...counts.entries()];
  }, [problems]);

  const grouped = useMemo(() => {
    const map = new Map<string, StatusResult[]>();
    for (const r of results) {
      const category = getProvider(r.id)?.category ?? "Other";
      const list = map.get(category) ?? [];
      list.push(r);
      map.set(category, list);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [results]);

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-plex-mono)] text-2xl font-bold tracking-tight text-[var(--fg)]">
            STATUS<span className="text-[var(--accent)]">_</span>HUB
          </h1>
          <p className="mt-1 font-[family-name:var(--font-plex-mono)] text-xs text-[var(--fg-dim)]">
            {lastFetched ? `sync ${lastFetched.toLocaleTimeString()}` : "loading..."}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => refresh(selected)}
            disabled={fetching}
            className="rounded-md border border-[var(--border)] px-3 py-1.5 font-[family-name:var(--font-plex-mono)] text-xs uppercase tracking-wide text-[var(--fg-dim)] hover:border-[var(--accent)]/40 hover:text-[var(--fg)] disabled:opacity-50"
          >
            {fetching ? "..." : "refresh"}
          </button>
          <Link
            href="/select"
            className="rounded-md bg-[var(--accent)] px-3 py-1.5 font-[family-name:var(--font-plex-mono)] text-xs font-semibold uppercase tracking-wide text-[#04140b] hover:opacity-90"
          >
            manage
          </Link>
        </div>
      </header>

      {selected.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--border)] p-12 text-center">
          <p className="mb-4 text-[var(--fg-dim)]">No services selected yet.</p>
          <Link
            href="/select"
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#04140b]"
          >
            Choose services
          </Link>
        </div>
      ) : (
        <>
          <div
            className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg border px-5 py-4"
            style={
              problems.length === 0
                ? { borderColor: "var(--led-operational)", background: "rgba(61, 220, 132, 0.06)" }
                : { borderColor: "var(--led-major)", background: "rgba(255, 157, 46, 0.06)" }
            }
          >
            <div className="flex items-center gap-2.5">
              <span
                className="led h-2.5 w-2.5"
                style={
                  {
                    "--dot-color": problems.length === 0 ? "var(--led-operational)" : "var(--led-major)",
                    background: problems.length === 0 ? "var(--led-operational)" : "var(--led-major)",
                  } as React.CSSProperties
                }
              />
              <span
                className="font-[family-name:var(--font-plex-mono)] text-sm font-semibold uppercase tracking-wide"
                style={{ color: problems.length === 0 ? "var(--led-operational)" : "var(--led-major)" }}
              >
                {problems.length === 0 ? "All systems operational" : `${problems.length} service(s) with issues`}
              </span>
            </div>

            <div className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-2 font-[family-name:var(--font-plex-mono)] text-xs text-[var(--fg-dim)]">
              <span>
                <span className="text-[var(--fg)]">{results.length - problems.length}</span>/{results.length} operational
              </span>
              {severityCounts.map(([indicator, count]) => (
                <span key={indicator} className="capitalize">
                  {count} {SEVERITY_LABEL[indicator] ?? indicator}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {grouped.map(([category, items]) => (
              <section key={category}>
                <h2 className="mb-3 font-[family-name:var(--font-plex-mono)] text-xs uppercase tracking-widest text-[var(--fg-dim)]">
                  {category}
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((r) => (
                    <StatusCard key={r.id} status={r} icon={getProvider(r.id)?.icon ?? r.id} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
