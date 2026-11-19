"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

/** Tiny external store so any component can reach the Lenis instance without prop drilling. */
let current: Lenis | null = null;
const listeners = new Set<() => void>();

const setCurrent = (next: Lenis | null) => {
  current = next;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useLenis = (): Lenis | null =>
  useSyncExternalStore(subscribe, () => current, () => null);

/** Lenis drives the scroll, GSAP's ticker drives Lenis, ScrollTrigger follows Lenis. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ lerp: 0.09, smoothWheel: true });
    const tick = (time: number) => instance.raf(time * 1000);

    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setCurrent(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setCurrent(null);
    };
  }, []);

  return children;
}
