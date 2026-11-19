import { ArrowRight, Monitor, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-3.9rem)] items-center overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-[10%] h-[120%]" data-parallax="0.12">
          <Image src="/images/team.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_30%,rgba(79,214,184,0.18),transparent)]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div>
          <p data-reveal data-hero className="glass mb-4 inline-flex items-center gap-3 rounded-full px-4 py-1.5 text-xs text-text/90">
            <span className="flex items-center gap-1.5"><Monitor size={13} aria-hidden /> Desktop</span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1.5"><Smartphone size={13} aria-hidden /> Mobile</span>
          </p>
          <h1
            data-reveal-words
            data-hero
            className="text-[2.4rem] leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]"
          >
            Your refund, in the right account, the first time.
          </h1>
          <p data-reveal data-hero className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Register your bank details once. We check them as you type, keep your account number masked and show you every refund from request to payout.
          </p>
          <div data-reveal data-hero className="mt-6 flex flex-row flex-nowrap items-center gap-3">
            <Link href="/dashboard/bank" className="btn btn-primary max-sm:flex-1 max-sm:!px-3 max-sm:text-sm">
              Add bank details <ArrowRight size={18} aria-hidden className="max-sm:hidden" />
            </Link>
            <a href="#devices" className="btn btn-ghost max-sm:flex-1 max-sm:!px-3 max-sm:text-sm">
              <span className="sm:hidden">See screens</span>
              <span className="hidden sm:inline">See it on every screen</span>
            </a>
          </div>
        </div>

        <div data-reveal data-hero className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="glass rounded-3xl p-5">
            <p className="text-xs text-muted">Refund update</p>
            <p className="mt-1 text-3xl font-extrabold">{formatCurrency(428.9, "EUR")}</p>
            <p className="text-sm text-muted">Northwind Air · TX-88213</p>
            <ol className="mt-5 space-y-3 text-sm">
              {[
                ["Initiated", "12 Nov", true],
                ["Processing at your bank", "In progress", true],
                ["Credited to account", "Expected within 5 to 10 business days", false],
              ].map(([label, meta, done]) => (
                <li key={String(label)} className="flex items-start gap-3">
                  <span className={`mt-1.5 size-2.5 rounded-full ${done ? "bg-mint" : "bg-white/20"}`} />
                  <span>
                    <span className={done ? "text-text" : "text-muted"}>{label}</span>
                    <span className="block text-xs text-muted">{meta}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="glass absolute -bottom-9 -left-2 hidden rounded-2xl px-4 py-3 text-sm sm:block lg:-left-10">
            <span className="text-gold">●</span> Refund completed, €14.99
          </div>
        </div>
      </div>
    </section>
  );
}
