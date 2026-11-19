import { STEPS } from "./content";

export function Steps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p data-reveal className="text-sm font-semibold tracking-widest text-mint uppercase">How it works</p>
          <h2 data-reveal-words className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            Three steps, about two minutes.
          </h2>
        </div>
        <div className="relative pl-10 sm:pl-14">
          <div className="absolute top-2 bottom-2 left-3 w-px bg-white/10 sm:left-5" aria-hidden>
            <div data-line className="h-full w-full origin-top bg-mint" />
          </div>
          <ol className="space-y-14">
            {STEPS.map((step, index) => (
              <li key={step.title} data-reveal className="relative">
                <span className="glass absolute top-0 -left-[3.1rem] grid size-9 place-items-center rounded-full font-mono text-sm text-mint sm:-left-[4.1rem] sm:size-11">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold sm:text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-md text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
