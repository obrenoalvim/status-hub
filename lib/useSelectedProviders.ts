"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "statushub.selected";
const CHANGE_EVENT = "statushub:selected-changed";

let cachedRaw: string | null = null;
let cachedValue: string[] = [];

function readSelected(): string[] {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  try {
    cachedValue = raw ? JSON.parse(raw) : [];
  } catch {
    cachedValue = [];
  }
  return cachedValue;
}

function getServerSnapshot(): string[] {
  return [];
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

/**
 * Reads the selected provider ids from localStorage as a React-managed
 * external store, so the very first client render matches the server
 * render (empty list) and then syncs to the real value with no manual
 * "loaded" flag or effect.
 */
export function useSelectedProviders() {
  const selected = useSyncExternalStore(subscribe, readSelected, getServerSnapshot);

  const save = useCallback((ids: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignore persistence failures
    }
    // the native "storage" event only fires in other tabs — notify this one too
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { selected, save };
}
