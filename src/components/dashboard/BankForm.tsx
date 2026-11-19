"use client";

import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { maskAccountNumber } from "@/lib/format";
import {
  CURRENCIES,
  validateBankDetails,
  type BankDetails,
  type BankDetailsInput,
  type FieldErrors,
} from "@/lib/validation/bank";
import { Select } from "../ui/Select";

interface BankFormProps {
  initial?: BankDetails | null;
  onSave: (details: BankDetails) => Promise<void> | void;
  onCancel?: () => void;
}

const EMPTY: BankDetailsInput = {
  accountType: "local",
  currency: "EUR",
  bankName: "",
  accountHolder: "",
  accountNumber: "",
  branch: "",
  swift: "",
};

const ACCOUNT_TYPE_OPTIONS = [
  { value: "local", label: "Local account" },
  { value: "international", label: "International account" },
] as const;

const CURRENCY_OPTIONS = CURRENCIES.map((code) => ({ value: code, label: code }));

type TextField = "bankName" | "accountHolder" | "accountNumber" | "branch" | "swift";

export function BankForm({ initial, onSave, onCancel }: BankFormProps) {
  const formId = useId();
  const [values, setValues] = useState<BankDetailsInput>(initial ?? EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState<BankDetails | null>(null);
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof BankDetailsInput>(key: K, value: BankDetailsInput[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) {
      const result = validateBankDetails(next);
      setErrors(result.success ? {} : result.errors);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    const result = validateBankDetails(values);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setPending(result.data);
  };

  const confirm = async () => {
    if (!pending) return;
    setSaving(true);
    await onSave(pending);
    setSaving(false);
  };

  if (pending) {
    return (
      <div className="space-y-6" aria-live="polite">
        <div>
          <h2 className="text-xl font-bold">Confirm the account holder</h2>
          <p className="mt-1 text-sm text-muted">Refunds will be sent to this name and account. Check that it matches your bank records.</p>
        </div>
        <div className="rounded-2xl border border-mint/30 bg-mint/[0.06] p-5">
          <p className="text-xs tracking-widest text-mint uppercase">Account holder</p>
          <p className="mt-1 text-2xl font-extrabold">{pending.accountHolder}</p>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <Detail label="Bank" value={pending.bankName} />
            <Detail label="Account" value={maskAccountNumber(pending.accountNumber)} mono />
            <Detail label="Currency" value={pending.currency} />
            {pending.branch && <Detail label="Branch" value={pending.branch} />}
            {pending.swift && <Detail label="SWIFT/BIC" value={pending.swift} mono />}
          </dl>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={confirm} disabled={saving}>
            <Check size={18} aria-hidden /> {saving ? "Saving..." : "Confirm and save"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setPending(null)}>
            <ArrowLeft size={18} aria-hidden /> Edit details
          </button>
        </div>
      </div>
    );
  }

  const text = (key: TextField, label: string, props: { placeholder?: string; required?: boolean; hint?: string; mono?: boolean; autoComplete?: string }) => {
    const id = `${formId}-${key}`;
    const error = errors[key];
    return (
      <div>
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-text/90">
          {label}
          {!props.required && <span className="ml-2 text-xs font-normal text-muted">Optional</span>}
        </label>
        <input
          id={id}
          name={key}
          value={values[key] ?? ""}
          onChange={(event) => update(key, event.target.value)}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete ?? "off"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : props.hint ? `${id}-hint` : undefined}
          className={`field ${props.mono ? "font-mono tracking-wide" : ""}`}
        />
        {error ? (
          <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-[#f4a3a3]">{error}</p>
        ) : props.hint ? (
          <p id={`${id}-hint`} className="mt-2 text-xs text-muted">{props.hint}</p>
        ) : null}
      </div>
    );
  };

  const international = values.accountType === "international";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Account type"
          value={values.accountType}
          options={[...ACCOUNT_TYPE_OPTIONS]}
          onChange={(value) => update("accountType", value)}
        />
        <Select label="Refund currency" value={values.currency} options={CURRENCY_OPTIONS} onChange={(value) => update("currency", value)} />
      </div>
      {text("bankName", "Bank name", { placeholder: "e.g. Atlas Bank", required: true })}
      {text("accountHolder", "Account holder's name", { placeholder: "As it appears on your bank account", required: true, autoComplete: "name" })}
      {text("accountNumber", "Account number or IBAN", { placeholder: "GB82 WEST 1234 5698 7654 32", required: true, mono: true, hint: "Spaces are fine, we clean them up." })}
      <div className="grid gap-5 sm:grid-cols-2">
        {text("branch", "Bank branch", { placeholder: "e.g. Central Branch" })}
        {text("swift", "SWIFT/BIC code", {
          placeholder: "BARCGB22",
          required: international,
          mono: true,
          hint: international ? "Required for international accounts." : "Only needed for international accounts.",
        })}
      </div>

      <p className="flex items-center gap-2 text-xs text-muted">
        <ShieldCheck size={14} className="text-mint" aria-hidden /> Your account number is masked once saved.
      </p>

      <div className="flex flex-wrap gap-3 pt-1">
        <button type="submit" className="btn btn-primary">Review details</button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className={mono ? "font-mono" : "font-semibold"}>{value}</dd>
    </div>
  );
}
