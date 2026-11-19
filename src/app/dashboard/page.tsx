"use client";

import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { RefundList } from "@/components/dashboard/RefundList";
import { useBankDetails } from "@/hooks/useBankDetails";
import { useRefunds } from "@/hooks/useRefunds";
import { demoUser } from "@/lib/data/demo";
import { filterRefunds, summarizeRefunds } from "@/lib/data/summary";
import { formatCurrency, maskAccountNumber } from "@/lib/format";

export default function OverviewPage() {
  const { refunds } = useRefunds();
  const { details, loading } = useBankDetails();
  const summary = useMemo(() => summarizeRefunds(refunds), [refunds]);
  const recent = useMemo(() => filterRefunds(refunds, { status: "all", from: "" }).slice(0, 4), [refunds]);

  return (
    <div className="space-y-10">
      <div className="rise">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Hello, {demoUser.name.split(" ")[0]}</h1>
        <p className="mt-2 text-muted">Here is where your refunds stand today.</p>
      </div>

      {!loading && !details && (
        <div style={{ "--i": 1 } as React.CSSProperties} className="rise glass flex flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 shrink-0 text-gold" size={20} aria-hidden />
            <span>
              <span className="font-bold">Add your bank details.</span>{" "}
              <span className="text-muted">Pending refunds cannot be paid out until we know where to send them.</span>
            </span>
          </p>
          <Link href="/dashboard/bank" className="btn btn-primary shrink-0">
            Add details <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      )}

      <section aria-label="Totals" className="grid gap-px overflow-hidden rounded-3xl border border-white/10 sm:grid-cols-3">
        <Figure index={2} label="On the way" value={formatCurrency(summary.pendingTotal, "EUR")} note={`${summary.pendingCount} refunds in progress`} accent="text-gold" />
        <Figure index={3} label="Received" value={formatCurrency(summary.completedTotal, "EUR")} note={`${summary.completedCount} refunds completed`} accent="text-mint" />
        <div style={{ "--i": 4 } as React.CSSProperties} className="rise bg-white/[0.03] p-6">
          <p className="text-sm text-muted">Refund account</p>
          {details ? (
            <>
              <p className="mt-2 text-xl font-extrabold">{details.accountHolder}</p>
              <p className="mt-1 flex items-center gap-2 font-mono text-sm text-muted">
                <CheckCircle2 size={14} className="text-mint" aria-hidden /> {details.bankName} {maskAccountNumber(details.accountNumber)}
              </p>
            </>
          ) : (
            <p className="mt-2 text-xl font-extrabold text-muted">Not set</p>
          )}
        </div>
      </section>

      <section style={{ "--i": 5 } as React.CSSProperties} className="rise">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold">Recent refunds</h2>
          <Link href="/dashboard/refunds" className="flex items-center gap-1 text-sm text-mint hover:underline">
            View all <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        <div className="mt-2">
          <RefundList refunds={recent} />
        </div>
      </section>
    </div>
  );
}

function Figure({ index, label, value, note, accent }: { index: number; label: string; value: string; note: string; accent: string }) {
  return (
    <div style={{ "--i": index } as React.CSSProperties} className="rise bg-white/[0.03] p-6">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold ${accent}`}>{value}</p>
      <p className="mt-1 text-xs text-muted">{note}</p>
    </div>
  );
}
