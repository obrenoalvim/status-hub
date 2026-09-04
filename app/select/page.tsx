"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PROVIDERS } from "@/lib/providers";
import { useSelectedProviders } from "@/lib/useSelectedProviders";
import ServiceIcon from "@/components/ServiceIcon";

export default function SelectPage() {
  const router = useRouter();
  const { selected, save } = useSelectedProviders();
  const [draft, setDraft] = useState<string[] | null>(null);
  const [query, setQuery] = useState("");

  const current = draft ?? selected;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROVIDERS;
    return PROVIDERS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof PROVIDERS>();
    for (const p of filtered) {
      const list = map.get(p.category) ?? [];
      list.push(p);
      map.set(p.category, list);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  function toggle(id: string) {
    const set = new Set(current);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    setDraft([...set]);
  }

  function selectAllFiltered() {
    setDraft([...new Set([...current, ...filtered.map((p) => p.id)])]);
  }

  function clearAll() {
    setDraft([]);
  }

  function handleSave() {
    save(current);
    router.push("/");
  }

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-plex-mono)] text-2xl font-bold tracking-tight text-[var(--fg)]">
            CHOOSE<span className="text-[var(--accent)]">_</span>SERVICES
          </h1>
          <p className="mt-1 font-[family-name:var(--font-plex-mono)] text-xs text-[var(--fg-dim)]">
            {current.length} selected
          </p>
        </div>
        <Link href="/" className="text-sm text-[var(--fg-dim)] hover:text-[var(--fg)] hover:underline">
          cancel
        </Link>
      </header>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or category..."
        className="mb-4 w-full rounded-md border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--fg)] outline-none placeholder:text-[var(--fg-dim)] focus:border-[var(--accent)]/50"
      />

      <div className="mb-4 flex gap-2">
        <button
          onClick={selectAllFiltered}
          className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs uppercase tracking-wide text-[var(--fg-dim)] hover:border-[var(--accent)]/40 hover:text-[var(--fg)]"
        >
          select all
        </button>
        <button
          onClick={clearAll}
          className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs uppercase tracking-wide text-[var(--fg-dim)] hover:border-[var(--accent)]/40 hover:text-[var(--fg)]"
        >
          clear
        </button>
      </div>

      <div className="space-y-6">
        {grouped.map(([category, providers]) => (
          <div key={category}>
            <h2 className="mb-2 font-[family-name:var(--font-plex-mono)] text-xs uppercase tracking-widest text-[var(--fg-dim)]">
              {category}
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {providers.map((p) => {
                const checked = current.includes(p.id);
                return (
                  <label
                    key={p.id}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2 text-sm transition-colors ${
                      checked
                        ? "border-[var(--accent)]/60 bg-[var(--accent)]/10 text-[var(--fg)]"
                        : "border-[var(--border)] bg-[var(--panel)] text-[var(--fg-dim)] hover:border-[var(--border)]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(p.id)}
                      className="h-4 w-4 accent-[var(--accent)]"
                    />
                    <ServiceIcon slug={p.icon} name={p.name} />
                    {p.name}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 mt-8 border-t border-[var(--border)] bg-[var(--bg)]/95 py-4 backdrop-blur">
        <button
          onClick={handleSave}
          className="w-full rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[#04140b] hover:opacity-90"
        >
          Save and view dashboard
        </button>
      </div>
    </div>
  );
}
