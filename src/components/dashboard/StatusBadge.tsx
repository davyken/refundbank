import clsx from "clsx";
import type { RefundStatus } from "@/lib/data/types";

const STYLES: Record<RefundStatus, { label: string; className: string }> = {
  initiated: { label: "Initiated", className: "bg-sky-400/15 text-sky-200" },
  processing: { label: "Processing", className: "bg-gold/15 text-gold" },
  completed: { label: "Completed", className: "bg-mint/15 text-mint" },
};

export function StatusBadge({ status }: { status: RefundStatus }) {
  const { label, className } = STYLES[status];
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", className)}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </span>
  );
}
