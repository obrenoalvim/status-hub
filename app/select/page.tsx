"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PROVIDERS } from "@/lib/providers";
import { useSelectedProviders } from "@/lib/useSelectedProviders";

export default function SelectPage() {
  const router = useRouter();
  const { selected, save, loaded } = useSelectedProviders();
  const [draft, setDraft] = useState<string[] | null>(null);
  const [query, setQuery] = useState("");

  const current = draft ?? (loaded ? selected : []);

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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Escolher serviços</h1>
            <p className="text-sm text-neutral-500">{current.length} selecionado(s)</p>
          </div>
          <Link href="/" className="text-sm text-neutral-500 hover:underline">
            Cancelar
          </Link>
        </header>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome ou categoria..."
          className="mb-4 w-full rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-black/30 dark:focus:border-white/30"
        />

        <div className="mb-4 flex gap-2">
          <button
            onClick={selectAllFiltered}
            className="rounded-md border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5"
          >
            Selecionar todos
          </button>
          <button
            onClick={clearAll}
            className="rounded-md border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5"
          >
            Limpar
          </button>
        </div>

        <div className="space-y-6">
          {grouped.map(([category, providers]) => (
            <div key={category}>
              <h2 className="mb-2 text-sm font-medium text-neutral-500">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {providers.map((p) => {
                  const checked = current.includes(p.id);
                  return (
                    <label
                      key={p.id}
                      className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer ${
                        checked
                          ? "border-neutral-900 dark:border-white bg-black/5 dark:bg-white/10"
                          : "border-black/10 dark:border-white/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(p.id)}
                        className="h-4 w-4"
                      />
                      {p.name}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 mt-8 border-t border-black/10 dark:border-white/10 bg-neutral-50/95 dark:bg-neutral-950/95 py-4">
          <button
            onClick={handleSave}
            className="w-full rounded-md bg-neutral-900 text-white dark:bg-white dark:text-black px-4 py-2.5 text-sm font-medium hover:opacity-90"
          >
            Salvar e ver dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
