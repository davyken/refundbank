"use client";

import clsx from "clsx";
import { Landmark, LayoutDashboard, MessageCircle, ReceiptText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DASHBOARD_LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/refunds", label: "Refunds", icon: ReceiptText },
  { href: "/dashboard/bank", label: "Bank details", icon: Landmark },
  { href: "/dashboard/messages", label: "Messages", icon: MessageCircle },
] as const;

export function isActivePath(pathname: string, href: string): boolean {
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" data-lenis-prevent-wheel className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
      <ul className="glass flex w-max min-w-full gap-1 rounded-full p-1.5 sm:w-fit">
        {DASHBOARD_LINKS.map(({ href, label, icon: Icon }) => {
          const active = isActivePath(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300",
                  active ? "bg-mint text-[#04201a]" : "text-text/75 hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon size={16} aria-hidden /> {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
