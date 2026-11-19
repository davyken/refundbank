"use client";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Logo } from "../ui/Logo";
import { NAV_LINKS } from "./content";

const SCROLLED_AFTER = 24;

const subscribe = (callback: () => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};

/** True once the page has moved away from the very top. */
export const useScrolled = (): boolean =>
  useSyncExternalStore(subscribe, () => window.scrollY > SCROLLED_AFTER, () => false);

/** Fixed to the viewport. Borderless at the top of a page, framed in glass once it scrolls. */
export function Nav() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const framed = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main"
        data-scrolled={framed}
        className="nav-bar relative mx-auto flex max-w-[84rem] items-center justify-between rounded-full py-2 pr-2 pl-4 sm:pl-6"
      >
        <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 font-extrabold tracking-tight">
          <Logo size={30} />
          Refund Bank
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm transition",
                  pathname === link.href ? "bg-white/10 text-white" : "text-text/80 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-text/85 transition hover:bg-white/10 hover:text-white sm:block">
            Sign in
          </Link>
          <Link href="/dashboard" className="btn btn-primary !px-4 !py-2.5 text-sm sm:!px-5">
            <span className="sm:hidden">Dashboard</span>
            <span className="hidden sm:inline">Open dashboard</span>
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-full transition hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>

        <ul
          id="mobile-menu"
          data-open={menuOpen}
          className="pop glass glass-strong absolute inset-x-0 top-full mt-2 rounded-3xl p-2 lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={clsx(
                  "block rounded-2xl px-4 py-3.5 font-semibold transition",
                  pathname === link.href ? "bg-mint/15 text-mint" : "text-text/90 hover:bg-white/10",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-3.5 font-semibold text-text/90 transition hover:bg-white/10">
              Sign in
            </Link>
          </li>
          <li>
            <Link href="/register" onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-3.5 font-semibold text-mint transition hover:bg-white/10">
              Create account
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
