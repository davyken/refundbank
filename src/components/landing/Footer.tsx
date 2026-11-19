import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "../ui/Logo";
import { CONTACT, LEGAL_LINKS, NAV_LINKS } from "./content";

const linkClass = "text-muted transition hover:text-mint";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-16">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5 text-lg font-extrabold">
            <Logo size={34} /> Refund Bank
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Register your bank details once and follow every refund from request to payout, on desktop and mobile.
          </p>
        </div>

        <nav aria-label="Product">
          <h3 className="text-xs font-bold tracking-widest text-text uppercase">Product</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}><Link href={link.href} className={linkClass}>{link.label}</Link></li>
            ))}
            <li><Link href="/dashboard" className={linkClass}>Dashboard</Link></li>
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h3 className="text-xs font-bold tracking-widest text-text uppercase">Legal</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}><Link href={link.href} className={linkClass}>{link.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-bold tracking-widest text-text uppercase">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0 text-mint" aria-hidden /><a href={`mailto:${CONTACT.email}`} className="transition hover:text-mint">{CONTACT.email}</a></li>
            <li className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0 text-mint" aria-hidden />{CONTACT.phone}</li>
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-mint" aria-hidden />{CONTACT.address}</li>
            <li className="text-xs">{CONTACT.hours}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-3 border-t border-white/10 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>Copyright 2026 Refund Bank. All rights reserved.</p>
        <p>Demo product running on sample data. Photos from Unsplash.</p>
      </div>

      {/* Oversized wordmark, cropped by the bottom edge */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.2em] overflow-hidden bg-[linear-gradient(180deg,rgba(79,214,184,0.5)_0%,rgba(79,214,184,0)_85%)] bg-clip-text px-2 text-center text-[clamp(3rem,15.2vw,17rem)] leading-[0.85] font-extrabold tracking-[-0.045em] whitespace-nowrap text-transparent select-none"
      >
        Refund Bank
      </p>
    </footer>
  );
}
