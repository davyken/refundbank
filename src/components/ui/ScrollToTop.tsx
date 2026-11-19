"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLenis } from "../providers/SmoothScroll";
import { getScrollRatio } from "./ScrollProgress";

const SHOW_AFTER = 600;
const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollToTop() {
  const lenis = useLenis();
  const [ratio, setRatio] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > SHOW_AFTER);
      setRatio(getScrollRatio(window.scrollY, document.documentElement.scrollHeight, window.innerHeight));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const goTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      data-visible={visible}
      className="glass fixed right-4 bottom-4 z-[80] grid size-12 place-items-center rounded-full transition-all duration-500 ease-out data-[visible=false]:pointer-events-none data-[visible=false]:translate-y-6 data-[visible=false]:opacity-0 sm:right-6 sm:bottom-6 hover:-translate-y-1"
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden>
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="var(--mint)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - ratio)}
        />
      </svg>
      <ArrowUp size={18} aria-hidden />
    </button>
  );
}
