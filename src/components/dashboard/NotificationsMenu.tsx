"use client";

import { Bell, CheckCircle2, Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildNotifications } from "@/lib/data/notifications";
import { formatDate } from "@/lib/format";
import { useRefunds } from "@/hooks/useRefunds";

export function NotificationsMenu() {
  const { refunds } = useRefunds();
  const feed = useMemo(() => buildNotifications(refunds).slice(0, 6), [refunds]);
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => !root.current?.contains(event.target as Node) && setOpen(false);
    const esc = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => {
          setOpen((current) => !current);
          setSeen(true);
        }}
        className="glass relative grid size-11 place-items-center rounded-full transition hover:-translate-y-0.5"
      >
        <Bell size={18} aria-hidden />
        {!seen && feed.length > 0 && <span className="absolute top-2.5 right-3 size-2 rounded-full bg-gold" />}
      </button>
      <div
        data-open={open}
        role="region"
        aria-label="Notifications"
        data-lenis-prevent
        className="pop glass glass-strong absolute right-0 z-40 mt-3 max-h-96 w-[min(22rem,calc(100vw-2rem))] overflow-auto rounded-3xl p-2"
      >
        <p className="px-3 py-2 text-xs tracking-widest text-muted uppercase">Refund updates</p>
        <ul>
          {feed.map((item) => {
            const Icon = item.kind === "completed" ? CheckCircle2 : Send;
            return (
              <li key={item.id} className="flex gap-3 rounded-2xl px-3 py-3 transition hover:bg-white/[0.06]">
                <Icon size={16} className={item.kind === "completed" ? "mt-0.5 shrink-0 text-mint" : "mt-0.5 shrink-0 text-gold"} aria-hidden />
                <div>
                  <p className="text-sm leading-snug">{item.message}</p>
                  <p className="mt-1 text-xs text-muted">{formatDate(item.at)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
