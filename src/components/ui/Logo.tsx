import { useId } from "react";

/** Refund arrow around a coin, on a mint tile. Same artwork as `app/icon.svg`. */
export function Logo({ size = 32 }: { size?: number }) {
  const gradient = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id={gradient} x1="6" y1="4" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8CEBD6" />
          <stop offset="1" stopColor="#25A88E" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill={`url(#${gradient})`} />
      <g transform="translate(14 14) scale(1.5)" stroke="#04201A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </g>
      <circle cx="32" cy="32" r="4.5" fill="#04201A" />
    </svg>
  );
}
