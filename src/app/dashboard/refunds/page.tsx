"use client";

import { useMemo, useState } from "react";
import { RefundList } from "@/components/dashboard/RefundList";
import { DatePicker } from "@/components/ui/DatePicker";
import { Select } from "@/components/ui/Select";
import { useRefunds } from "@/hooks/useRefunds";
import { filterRefunds, type RefundFilters } from "@/lib/data/summary";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "initiated", label: "Initiated" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
] as const;

export default function RefundsPage() {
  const { refunds, loading } = useRefunds();
  const [filters, setFilters] = useState<RefundFilters>({ status: "all", from: "" });
  const visible = useMemo(() => filterRefunds(refunds, filters), [refunds, filters]);

  return (
    <div className="space-y-8">
      <div className="rise">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Refunds</h1>
        <p className="mt-2 text-muted">Every refund is linked to its original transaction.</p>
      </div>

      <div style={{ "--i": 1 } as React.CSSProperties} className="rise relative z-20 grid gap-4 sm:max-w-xl sm:grid-cols-2">
        <Select label="Status" value={filters.status} options={[...STATUS_OPTIONS]} onChange={(status) => setFilters((f) => ({ ...f, status }))} />
        <DatePicker label="Initiated since" value={filters.from} onChange={(from) => setFilters((f) => ({ ...f, from }))} />
      </div>

      <section style={{ "--i": 2 } as React.CSSProperties} className="rise" aria-live="polite" aria-busy={loading}>
        <p className="mb-1 text-sm text-muted">{visible.length} {visible.length === 1 ? "refund" : "refunds"}</p>
        <RefundList refunds={visible} />
      </section>
    </div>
  );
}
