const DAY_MS = 86_400_000;

export function maskAccountNumber(value: string, visible = 4): string {
  const clean = value.replace(/\s/g, "");
  if (clean.length <= visible) return clean;
  return `•••• ${clean.slice(-visible)}`;
}

export function formatCurrency(amount: number, currency: string, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: ["XAF", "XOF"].includes(currency) ? 0 : 2,
  }).format(amount);
}

export function formatDate(iso: string, locale = "en-GB"): string {
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }).format(
    new Date(iso),
  );
}

export function toIsoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
