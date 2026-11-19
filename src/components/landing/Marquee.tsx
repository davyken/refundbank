import { REFUND_REASONS } from "./content";

export function Marquee() {
  const items = [...REFUND_REASONS, ...REFUND_REASONS];
  return (
    <section aria-label="Refunds we handle" className="border-y border-white/10 py-5">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="marquee-track flex w-max gap-10 pr-10">
          {items.map((reason, index) => (
            <li key={index} aria-hidden={index >= REFUND_REASONS.length} className="flex items-center gap-10 text-sm text-muted">
              {reason}
              <span className="text-mint">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
