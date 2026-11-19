"use client";

import { createContext, useContext } from "react";
import type { SessionUser } from "@/lib/auth/session";

const SessionContext = createContext<SessionUser | null>(null);

export const SessionProvider = ({ user, children }: { user: SessionUser; children: React.ReactNode }) => (
  <SessionContext.Provider value={user}>{children}</SessionContext.Provider>
);

/** The signed in user. Only valid inside the dashboard shell, which guarantees a session. */
export function useUser(): SessionUser {
  const user = useContext(SessionContext);
  if (!user) throw new Error("useUser must be used inside the dashboard");
  return user;
}
