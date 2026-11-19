"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

export const INTRO_KEY = "refund-bank:intro-seen";
export const INTRO_DONE_EVENT = "intro:done";

const announceDone = () => {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
};

/** Opening animation. Plays once per browser session and never with reduced motion. */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}

    if (reduced || seen) {
      announceDone();
      if (root.current) root.current.style.display = "none";
      return;
    }

    const html = document.documentElement;
    html.style.overflow = "hidden";
    const counter = { value: 0 };
    const label = root.current?.querySelector<HTMLElement>("[data-intro-count]");

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            html.style.overflow = "";
            try {
              sessionStorage.setItem(INTRO_KEY, "1");
            } catch {}
            announceDone();
            setMounted(false);
          },
        })
        .from("[data-intro-logo]", { scale: 0.6, autoAlpha: 0, duration: 0.8, ease: "back.out(1.6)" })
        .from("[data-intro-word]", { yPercent: 110, stagger: 0.08, duration: 0.7, ease: "power4.out" }, "-=0.4")
        .to(counter, {
          value: 100,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (label) label.textContent = String(Math.round(counter.value)).padStart(3, "0");
          },
        }, 0.2)
        .to("[data-intro-bar]", { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.2)
        .to("[data-intro-content]", { autoAlpha: 0, y: -20, duration: 0.4, ease: "power2.in" }, "+=0.15")
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.1");
    }, root);

    return () => {
      ctx.revert();
      html.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="intro-overlay fixed inset-0 z-[100] grid place-items-center bg-ink"
      style={{ background: "radial-gradient(800px 500px at 50% 40%, #0f2a2c, #060b12 70%)" }}
    >
      <div data-intro-content className="flex flex-col items-center gap-6 px-6 text-center">
        <div data-intro-logo>
          <Logo size={64} />
        </div>
        <div className="flex gap-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
          {["Refund", "Bank"].map((word) => (
            <span key={word} className="word-mask">
              <span data-intro-word className="word-inner">
                {word}
              </span>
            </span>
          ))}
        </div>
        <div className="w-56 sm:w-72">
          <div className="h-px w-full bg-white/15">
            <div data-intro-bar className="h-full origin-left scale-x-0 bg-mint" />
          </div>
          <p className="mt-3 font-mono text-xs tracking-[0.3em] text-muted">
            <span data-intro-count>000</span> / 100
          </p>
        </div>
      </div>
    </div>
  );
}
