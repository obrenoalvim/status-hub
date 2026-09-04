"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import StatusCard from "@/components/StatusCard";
import { StatusResult } from "@/lib/normalize";
import { getProvider } from "@/lib/providers";
import { useSelectedProviders } from "@/lib/useSelectedProviders";

// Statuspage.io (most providers) only refreshes data every 10s at the edge
// (s-maxage=10). 12s gives us a margin to always get the newest value
// without hammering the origin for nothing.
const REFRESH_MS = 12_000;

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

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <header className="mb-8 flex items-center justify-between gap-4">
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

      {selected.length === 0 && (
        <div className="rounded-lg border border-dashed border-[var(--border)] p-10 text-center">
          <p className="mb-4 text-[var(--fg-dim)]">No services selected yet.</p>
          <Link
            href="/select"
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#04140b]"
          >
            Choose services
          </Link>
        </div>
      )}

      {problems.length > 0 && (
        <div
          className="led mb-6 flex items-center gap-2 rounded-md border px-4 py-3 text-sm"
          style={{
            borderColor: "var(--led-major)",
            background: "rgba(255, 157, 46, 0.08)",
            color: "var(--led-major)",
            boxShadow: "none",
          }}
        >
          <span className="led h-2 w-2" style={{ "--dot-color": "var(--led-major)", background: "var(--led-major)" } as React.CSSProperties} />
          {problems.length} service(s) with issues right now
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {results.map((r) => (
          <StatusCard key={r.id} status={r} icon={getProvider(r.id)?.icon ?? r.id} />
        ))}
      </div>
    </div>
  );
}
