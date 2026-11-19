import Image from "next/image";
import { FACTS } from "./content";

export function Why() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
      <div className="grid items-end gap-10 lg:grid-cols-2">
        <div>
          <p data-reveal className="text-sm font-semibold tracking-widest text-mint uppercase">Why it matters</p>
          <h2 data-reveal-words className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            Most failed refunds come from a typo.
          </h2>
        </div>
        <p data-reveal className="text-lg leading-relaxed text-muted">
          A wrong digit or a missing SWIFT code sends a payout back to the sender and restarts the wait. Validating the details before they are saved is the cheapest way to avoid it.
        </p>
      </div>

      <div className="relative mt-14 overflow-hidden rounded-3xl">
        <div className="relative aspect-[16/9] sm:aspect-[21/9]">
          <Image src="/images/city.jpg" alt="Financial district buildings at dusk" fill sizes="(min-width:1152px) 1100px, 100vw" className="scale-110 object-cover opacity-60" data-parallax="0.15" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div>
        <dl className="relative -mt-24 grid gap-px sm:-mt-28 sm:grid-cols-3">
          {FACTS.map((fact) => (
            <div key={fact.label} className="glass px-6 py-6 first:rounded-t-3xl sm:first:rounded-l-3xl sm:first:rounded-tr-none sm:last:rounded-r-3xl sm:last:rounded-bl-none">
              <dt className="order-2 mt-2 text-sm text-text/90">{fact.label}</dt>
              <dd className="flex flex-col">
                <span className="text-4xl font-extrabold text-mint sm:text-5xl">
                  <span data-count={fact.value}>0</span>
                  {fact.suffix}
                </span>
                <span className="mt-2 text-xs text-muted">{fact.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
