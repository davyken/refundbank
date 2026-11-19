"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "@/lib/auth/session";
import { initials } from "@/lib/format";
import { useSession } from "@/hooks/useSession";
import { Logo } from "../ui/Logo";
import { DashboardNav } from "./DashboardNav";
import { NotificationsMenu } from "./NotificationsMenu";
import { Sidebar } from "./Sidebar";
import { SessionProvider } from "./SessionContext";

/** Guards the dashboard: signed out visitors are sent to the login screen. */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session, ready } = useSession();

  useEffect(() => {
    if (ready && !session) router.replace("/login");
  }, [ready, session, router]);

  if (!ready || !session) {
    return (
      <div className="grid min-h-svh place-items-center" role="status" aria-label="Loading">
        <span className="size-9 animate-spin rounded-full border-2 border-white/15 border-t-mint" />
      </div>
    );
  }

  const handleSignOut = () => {
    signOut(localStorage);
    router.replace("/login");
  };

  return (
    <SessionProvider user={session}>
      <div className="mx-auto flex max-w-[92rem] gap-6 p-4 sm:p-6">
        <Sidebar user={session} onSignOut={handleSignOut} />

        <div className="min-w-0 flex-1 pb-20">
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight lg:invisible">
              <Logo size={30} /> <span className="hidden sm:inline">Refund Bank</span>
            </Link>
            <div className="flex items-center gap-3">
              <NotificationsMenu />
              <span className="grid size-11 place-items-center rounded-full bg-gold/90 font-bold text-[#2b1d03] lg:hidden" aria-hidden>
                {initials(session.name)}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                aria-label="Sign out"
                className="glass grid size-11 place-items-center rounded-full transition hover:-translate-y-0.5 lg:hidden"
              >
                <LogOut size={17} aria-hidden />
              </button>
            </div>
          </header>
          <div className="mt-5 lg:hidden">
            <DashboardNav />
          </div>
          <main className="mt-7 lg:mt-4">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
