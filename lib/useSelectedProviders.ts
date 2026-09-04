"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "statushub.selected";

export function useSelectedProviders() {
  const [selected, setSelected] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSelected(JSON.parse(raw));
    } catch {
      // localStorage indisponível (ex: private mode) — segue com lista vazia
    }
    setLoaded(true);
  }, []);

  const save = useCallback((ids: string[]) => {
    setSelected(ids);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignora falha de persistência
    }
  }, []);

  return { selected, save, loaded };
}
