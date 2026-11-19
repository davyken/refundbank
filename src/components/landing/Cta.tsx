import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-8">
      <div className="relative isolate overflow-hidden rounded-3xl px-6 py-16 text-center sm:py-24">
        <Image src="/images/card.jpg" alt="" fill sizes="1100px" className="-z-10 object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink/85 via-ink/70 to-mint-deep/30" />
        <h2 data-reveal-words className="mx-auto max-w-2xl text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
          Add your bank details before you need them.
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-lg text-text/80">Explore the demo dashboard, no sign up needed.</p>
        <div data-reveal className="mt-8">
          <Link href="/dashboard" className="btn btn-primary">
            Open the dashboard <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
