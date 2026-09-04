"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import StatusCard from "@/components/StatusCard";
import { StatusResult } from "@/lib/normalize";
import { useSelectedProviders } from "@/lib/useSelectedProviders";

const REFRESH_MS = 60_000;

export default function DashboardPage() {
  const { selected, loaded } = useSelectedProviders();
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
    if (!loaded) return;
    refresh(selected);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => refresh(selected), REFRESH_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loaded, selected, refresh]);

  const problems = results.filter((r) => r.indicator !== "operational");

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Status Hub</h1>
            <p className="text-sm text-neutral-500">
              {lastFetched ? `Atualizado às ${lastFetched.toLocaleTimeString()}` : "Carregando..."}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => refresh(selected)}
              disabled={fetching}
              className="rounded-md border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
            >
              {fetching ? "Atualizando..." : "Atualizar"}
            </button>
            <Link
              href="/select"
              className="rounded-md bg-neutral-900 text-white dark:bg-white dark:text-black px-3 py-1.5 text-sm hover:opacity-90"
            >
              Gerenciar
            </Link>
          </div>
        </header>

        {loaded && selected.length === 0 && (
          <div className="rounded-lg border border-dashed border-black/15 dark:border-white/15 p-10 text-center">
            <p className="mb-4 text-neutral-500">Nenhum serviço selecionado ainda.</p>
            <Link href="/select" className="rounded-md bg-neutral-900 text-white dark:bg-white dark:text-black px-4 py-2 text-sm">
              Escolher serviços
            </Link>
          </div>
        )}

        {problems.length > 0 && (
          <div className="mb-6 rounded-lg border border-orange-300 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/40 px-4 py-3 text-sm text-orange-800 dark:text-orange-300">
            {problems.length} serviço(s) com problema agora.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {results.map((r) => (
            <StatusCard key={r.id} status={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
