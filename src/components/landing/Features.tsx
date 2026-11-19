import { FEATURES } from "./content";

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 pb-24 sm:px-8 sm:pb-32">
      <p data-reveal className="text-sm font-semibold tracking-widest text-mint uppercase">What you can do</p>
      <h2 data-reveal-words className="mt-4 max-w-2xl text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
        Everything a refund needs, nothing it does not.
      </h2>
      <ol className="mt-14 divide-y divide-white/10 border-y border-white/10">
        {FEATURES.map((feature, index) => (
          <li key={feature.code} data-reveal className="group grid gap-4 py-8 transition-colors hover:bg-white/[0.02] sm:grid-cols-[6rem_1fr_1.2fr] sm:gap-8 sm:py-10">
            <span className="font-mono text-sm text-gold">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="text-xl font-bold transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl">{feature.title}</h3>
            <p className="leading-relaxed text-muted">{feature.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
