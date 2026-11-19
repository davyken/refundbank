"use client";

import clsx from "clsx";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { FAQ } from "./content";

export function Faq() {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 pb-24 sm:px-8 sm:pb-32">
      <p data-reveal className="text-center text-sm font-semibold tracking-widest text-mint uppercase">FAQ</p>
      <h2 data-reveal-words className="mt-4 text-center text-3xl font-extrabold tracking-tight sm:text-5xl">
        Good questions.
      </h2>
      <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {FAQ.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.q} data-reveal>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${base}-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold sm:text-lg"
                >
                  {item.q}
                  <Plus size={20} aria-hidden className={clsx("shrink-0 text-mint transition-transform duration-300", isOpen && "rotate-45")} />
                </button>
              </h3>
              <div
                id={`${base}-${index}`}
                role="region"
                className={clsx("grid transition-[grid-template-rows] duration-500 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
              >
                <p className="overflow-hidden pr-10 text-muted">
                  <span className="block pb-5 leading-relaxed">{item.a}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
