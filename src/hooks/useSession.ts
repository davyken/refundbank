"use client";

import { useMemo, useSyncExternalStore } from "react";
import { SESSION_EVENT, SESSION_KEY, parseSession, type SessionUser } from "@/lib/auth/session";

const subscribe = (callback: () => void) => {
  window.addEventListener(SESSION_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(SESSION_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

const read = (): string | null => {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
};

/** `ready` is false during server rendering and hydration, so callers never flash the wrong screen. */
export function useSession(): { session: SessionUser | null; ready: boolean } {
  const raw = useSyncExternalStore<string | null | undefined>(subscribe, read, () => undefined);
  return useMemo(() => ({ session: parseSession(raw), ready: raw !== undefined }), [raw]);
}
