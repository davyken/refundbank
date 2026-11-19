import { Bell, CheckCircle2, Clock3, Landmark } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { demoRefunds } from "@/lib/data/demo";

const STATUS_STYLE = {
  completed: "text-mint",
  processing: "text-gold",
  initiated: "text-sky-300",
} as const;

function StatusDot({ status }: { status: keyof typeof STATUS_STYLE }) {
  const Icon = status === "completed" ? CheckCircle2 : Clock3;
  return <Icon size={14} className={STATUS_STYLE[status]} aria-hidden />;
}

export function DesktopMock() {
  return (
    <div className="glass overflow-hidden rounded-2xl sm:rounded-3xl" role="img" aria-label="Refund Bank dashboard on a desktop screen">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="mx-auto rounded-full bg-white/5 px-4 py-0.5 text-[0.65rem] text-muted">app.refundbank.example/dashboard</span>
      </div>
      <div className="grid gap-5 p-4 sm:grid-cols-[1.4fr_1fr] sm:p-6">
        <div>
          <p className="text-xs text-muted">Pending refunds</p>
          <p className="mt-1 text-2xl font-extrabold sm:text-4xl">{formatCurrency(557.9, "EUR")}</p>
          <ul className="mt-5 divide-y divide-white/10 text-sm">
            {demoRefunds.slice(0, 4).map((refund) => (
              <li key={refund.id} className="flex items-center justify-between gap-3 py-2.5">
                <span className="flex min-w-0 items-center gap-2">
                  <StatusDot status={refund.status} />
                  <span className="truncate">{refund.merchant}</span>
                </span>
                <span className="shrink-0 font-semibold">{formatCurrency(refund.amount, refund.currency)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="flex items-center gap-2 text-xs text-muted">
            <Landmark size={14} aria-hidden /> Refund account
          </p>
          <p className="mt-3 font-semibold">Alex Morgan</p>
          <p className="font-mono text-sm text-muted">{"•••• 5432"}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-3 py-1 text-xs text-mint">
            <CheckCircle2 size={12} aria-hidden /> Verified format
          </p>
        </div>
      </div>
    </div>
  );
}

export function PhoneMock() {
  return (
    <div
      className="glass mx-auto w-[15.5rem] rounded-[2.4rem] p-2.5 sm:w-[17rem]"
      role="img"
      aria-label="Refund Bank dashboard on a mobile phone"
    >
      <div className="overflow-hidden rounded-[1.9rem] bg-ink/80 p-4">
        <div className="mx-auto mb-4 h-5 w-20 rounded-full bg-white/10" />
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">Hi Alex</p>
          <span className="relative grid size-8 place-items-center rounded-full bg-white/10">
            <Bell size={14} aria-hidden />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-gold" />
          </span>
        </div>
        <div className="mt-4 rounded-2xl bg-gradient-to-br from-mint/25 to-mint/5 p-4">
          <p className="text-[0.65rem] text-text/70">Refund on its way</p>
          <p className="mt-1 text-xl font-extrabold">{formatCurrency(428.9, "EUR")}</p>
          <p className="mt-1 text-[0.65rem] text-text/70">Northwind Air</p>
          <div className="mt-3 h-1.5 rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-mint" />
          </div>
        </div>
        <ul className="mt-4 space-y-2.5 text-xs">
          {demoRefunds.slice(2, 5).map((refund) => (
            <li key={refund.id} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <StatusDot status={refund.status} />
                {refund.merchant}
              </span>
              <span className="font-semibold">{formatCurrency(refund.amount, refund.currency)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
