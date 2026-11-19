"use client";

import { CheckCircle2, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { BankForm } from "@/components/dashboard/BankForm";
import { useBankDetails } from "@/hooks/useBankDetails";
import { maskAccountNumber } from "@/lib/format";
import type { BankDetails } from "@/lib/validation/bank";

export default function BankPage() {
  const { details, loading, save, remove } = useBankDetails();
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("");

  const handleSave = async (next: BankDetails) => {
    await save(next);
    setEditing(false);
    setNotice("Bank details saved. New refunds will be sent to this account.");
  };

  const handleRemove = async () => {
    await remove();
    setNotice("Bank details removed.");
  };

  const showForm = editing || (!loading && !details);

  return (
    <div className="space-y-8">
      <div className="rise">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Bank details</h1>
        <p className="mt-2 max-w-xl text-muted">The account where your refunds are paid. We check every field before saving.</p>
      </div>

      <p role="status" className="min-h-0 text-sm text-mint">{notice}</p>

      <div style={{ "--i": 1 } as React.CSSProperties} className="rise glass max-w-2xl rounded-3xl p-5 sm:p-8">
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : showForm ? (
          <BankForm initial={details} onSave={handleSave} onCancel={details ? () => setEditing(false) : undefined} />
        ) : details ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-xs tracking-widest text-mint uppercase">
                  <CheckCircle2 size={14} aria-hidden /> Active refund account
                </p>
                <p className="mt-2 text-2xl font-extrabold">{details.accountHolder}</p>
              </div>
            </div>
            <dl className="grid gap-5 text-sm sm:grid-cols-2">
              <Row label="Bank" value={details.bankName} />
              <Row label="Account" value={maskAccountNumber(details.accountNumber)} mono />
              <Row label="Currency" value={details.currency} />
              <Row label="Type" value={details.accountType === "international" ? "International" : "Local"} />
              {details.branch && <Row label="Branch" value={details.branch} />}
              {details.swift && <Row label="SWIFT/BIC" value={details.swift} mono />}
            </dl>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary" onClick={() => { setNotice(""); setEditing(true); }}>
                <Pencil size={16} aria-hidden /> Update details
              </button>
              <button type="button" className="btn btn-ghost" onClick={handleRemove}>
                <Trash2 size={16} aria-hidden /> Remove
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className={mono ? "font-mono" : "font-semibold"}>{value}</dd>
    </div>
  );
}
