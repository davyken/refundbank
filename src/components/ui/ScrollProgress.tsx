"use client";

import { useEffect, useRef } from "react";

export function getScrollRatio(scrollTop: number, scrollHeight: number, viewport: number): number {
  const max = scrollHeight - viewport;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, scrollTop / max));
}

/** Thin bar fixed to the top of the viewport that fills as the page scrolls. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const { scrollHeight } = document.documentElement;
      const ratio = getScrollRatio(window.scrollY, scrollHeight, window.innerHeight);
      if (bar.current) bar.current.style.transform = `scaleX(${ratio})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px]" aria-hidden>
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-mint-deep via-mint to-gold"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
