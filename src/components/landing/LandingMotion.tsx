"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { INTRO_DONE_EVENT } from "../ui/Intro";

const query = <T extends HTMLElement = HTMLElement>(selector: string) =>
  gsap.utils.toArray<T>(selector);

function splitIntoWords(el: HTMLElement): () => void {
  const original = el.textContent ?? "";
  el.replaceChildren(
    ...original
      .split(/\s+/)
      .filter(Boolean)
      .flatMap((word, index, all) => {
        const mask = document.createElement("span");
        mask.className = "word-mask";
        const inner = document.createElement("span");
        inner.className = "word-inner";
        inner.textContent = word;
        mask.append(inner);
        return index < all.length - 1 ? [mask, document.createTextNode(" ")] : [mask];
      }),
  );
  return () => el.replaceChildren(original);
}

/**
 * Drives every landing animation from data attributes so sections stay declarative:
 *  data-reveal           fade and rise on enter
 *  data-reveal-words     headline revealed word by word
 *  data-parallax="0.2"   vertical drift while scrolling
 *  data-count="34"       number counting up
 *  data-line             vertical line that draws with scroll
 *  data-hero             waits for the opening animation, then plays in sequence
 */
export function LandingMotion() {
  const pathname = usePathname();

  /** The layout persists between pages, so animations are rebuilt on every route change. */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const undoSplits: Array<() => void> = [];
    const heroTweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      const onEnter = (trigger: Element) => ({ trigger, start: "top 88%", once: true });

      query("[data-reveal-words]").forEach((el) => {
        undoSplits.push(splitIntoWords(el));
        gsap.set(el, { visibility: "visible" });
        const hero = el.hasAttribute("data-hero");
        const tween = gsap.from(el.querySelectorAll(".word-inner"), {
          yPercent: 115,
          duration: 1,
          stagger: 0.06,
          ease: "power4.out",
          paused: hero,
          scrollTrigger: hero ? undefined : onEnter(el),
        });
        if (hero) heroTweens.push(tween);
      });

      query("[data-reveal]").forEach((el) => {
        const hero = el.hasAttribute("data-hero");
        const tween = gsap.fromTo(
          el,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            delay: Number(el.dataset.delay ?? 0),
            ease: "power3.out",
            paused: hero,
            scrollTrigger: hero ? undefined : onEnter(el),
          },
        );
        if (hero) heroTweens.push(tween);
      });

      query("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax);
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      query("[data-count]").forEach((el) => {
        const state = { value: 0 };
        gsap.to(state, {
          value: Number(el.dataset.count),
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: onEnter(el),
          onUpdate: () => {
            el.textContent = String(Math.round(state.value));
          },
        });
      });

      query("[data-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: { trigger: el.parentElement, start: "top 70%", end: "bottom 70%", scrub: true },
          },
        );
      });
    });

    const playHero = () => heroTweens.forEach((tween, index) => tween.delay(index * 0.1).play());

    if (document.documentElement.dataset.intro === "done") playHero();
    else window.addEventListener(INTRO_DONE_EVENT, playHero, { once: true });

    return () => {
      window.removeEventListener(INTRO_DONE_EVENT, playHero);
      ctx.revert();
      undoSplits.forEach((undo) => undo());
    };
  }, [pathname]);

  return null;
}
