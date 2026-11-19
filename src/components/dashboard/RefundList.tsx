import { formatCurrency, formatDate } from "@/lib/format";
import type { Refund } from "@/lib/data/types";
import { StatusBadge } from "./StatusBadge";

export function RefundList({ refunds, emptyText = "No refunds match these filters." }: { refunds: Refund[]; emptyText?: string }) {
  if (refunds.length === 0) {
    return <p className="py-10 text-center text-muted">{emptyText}</p>;
  }
  return (
    <ul className="divide-y divide-white/10">
      {refunds.map((refund) => (
        <li key={refund.id} className="grid gap-x-6 gap-y-2 py-4 sm:grid-cols-[1.6fr_1fr_auto_auto] sm:items-center">
          <div className="min-w-0">
            <p className="truncate font-semibold">{refund.merchant}</p>
            <p className="text-sm text-muted">
              {refund.reason} · <span className="font-mono text-xs">{refund.transactionId}</span>
            </p>
          </div>
          <p className="text-sm text-muted">
            <span className="sm:hidden">Initiated </span>
            {formatDate(refund.initiatedAt)}
          </p>
          <p className="font-bold sm:text-right">{formatCurrency(refund.amount, refund.currency)}</p>
          <div className="sm:justify-self-end">
            <StatusBadge status={refund.status} />
          </div>
        </li>
      ))}
    </ul>
  );
}
