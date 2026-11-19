"use client";

import clsx from "clsx";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { initials } from "@/lib/format";
import type { SessionUser } from "@/lib/auth/session";
import { Logo } from "../ui/Logo";
import { DASHBOARD_LINKS, isActivePath } from "./DashboardNav";

const UNREAD: Record<string, number> = { "/dashboard/messages": 1 };

interface SidebarProps {
  user: SessionUser;
  onSignOut: () => void;
}

/** Desktop sidebar. Every shape is round: the panel, the item pills and the icon bubbles. */
export function Sidebar({ user, onSignOut }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Sidebar"
      className="glass glass-strong sticky top-6 hidden h-[calc(100svh-3rem)] w-72 shrink-0 flex-col rounded-[2.5rem] p-5 lg:flex"
    >
      <Link href="/" className="flex items-center gap-3 rounded-full py-1 pr-3 pl-1 font-extrabold tracking-tight">
        <Logo size={40} />
        Refund Bank
      </Link>

      <nav aria-label="Dashboard" className="mt-8 flex-1">
        <p className="mb-3 px-4 text-[0.7rem] font-bold tracking-widest text-muted uppercase">Menu</p>
        <ul className="space-y-1.5">
          {DASHBOARD_LINKS.map(({ href, label, icon: Icon }) => {
            const active = isActivePath(pathname, href);
            const unread = UNREAD[href];
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "group flex items-center gap-3 rounded-full p-1.5 pr-4 font-semibold transition-all duration-300",
                    active ? "bg-mint/15 text-white" : "text-text/75 hover:bg-white/[0.06] hover:text-white",
                  )}
                >
                  <span
                    className={clsx(
                      "grid size-10 place-items-center rounded-full transition-all duration-300",
                      active ? "bg-mint text-[#04201a] shadow-[0_8px_20px_-8px_rgba(79,214,184,0.9)]" : "bg-white/[0.06] group-hover:bg-white/10",
                    )}
                  >
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className="flex-1">{label}</span>
                  {unread ? (
                    <span className="grid size-6 place-items-center rounded-full bg-gold text-xs font-bold text-[#2b1d03]" aria-label={`${unread} unread`}>
                      {unread}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] p-1.5 pr-2">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold/90 font-bold text-[#2b1d03]">
          {initials(user.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">{user.name}</span>
          <span className="block truncate text-xs text-muted">{user.email}</span>
        </span>
        <button
          type="button"
          onClick={onSignOut}
          aria-label="Sign out"
          className="grid size-10 shrink-0 place-items-center rounded-full text-muted transition hover:bg-white/10 hover:text-white"
        >
          <LogOut size={17} aria-hidden />
        </button>
      </div>
    </aside>
  );
}
