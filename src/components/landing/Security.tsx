import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { SECURITY_POINTS } from "./content";

export function Security() {
  return (
    <section id="security" className="mx-auto max-w-6xl px-4 pb-24 sm:px-8 sm:pb-32">
      <div className="grid overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-72 lg:min-h-full">
          <Image src="/images/night.jpg" alt="City skyline at night" fill sizes="(min-width:1024px) 500px, 100vw" className="object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent lg:bg-gradient-to-r" />
          <div className="glass absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl px-4 py-3">
            <ShieldCheck className="text-mint" aria-hidden />
            <span className="text-sm">Banking data is treated as confidential</span>
          </div>
        </div>
        <div className="bg-navy/60 p-7 sm:p-12">
          <p data-reveal className="text-sm font-semibold tracking-widest text-mint uppercase">Security</p>
          <h2 data-reveal-words className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
            Built around the sensitivity of bank details.
          </h2>
          <ul className="mt-9 space-y-6">
            {SECURITY_POINTS.map((point) => (
              <li key={point.title} data-reveal className="flex gap-4">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                <div>
                  <h3 className="font-bold">{point.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
