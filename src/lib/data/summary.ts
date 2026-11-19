import type { Refund, RefundStatus } from "./types";

export interface RefundSummary {
  pendingTotal: number;
  completedTotal: number;
  pendingCount: number;
  completedCount: number;
}

export function summarizeRefunds(refunds: Refund[]): RefundSummary {
  const summary: RefundSummary = { pendingTotal: 0, completedTotal: 0, pendingCount: 0, completedCount: 0 };
  for (const refund of refunds) {
    if (refund.status === "completed") {
      summary.completedTotal += refund.amount;
      summary.completedCount++;
    } else {
      summary.pendingTotal += refund.amount;
      summary.pendingCount++;
    }
  }
  summary.pendingTotal = Math.round(summary.pendingTotal * 100) / 100;
  summary.completedTotal = Math.round(summary.completedTotal * 100) / 100;
  return summary;
}

export interface RefundFilters {
  status: RefundStatus | "all";
  /** ISO date. Refunds initiated before it are hidden. Empty means no limit. */
  from: string;
}

export function filterRefunds(refunds: Refund[], { status, from }: RefundFilters): Refund[] {
  return refunds
    .filter((refund) => status === "all" || refund.status === status)
    .filter((refund) => !from || refund.initiatedAt >= from)
    .sort((a, b) => b.initiatedAt.localeCompare(a.initiatedAt));
}
