"use client";

import clsx from "clsx";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { WEEKDAYS, buildMonthGrid, isSameDay, monthLabel, shiftMonth } from "@/lib/calendar";
import { formatDate, toIsoDate } from "@/lib/format";

interface DatePickerProps {
  label: string;
  /** ISO date (yyyy-mm-dd) or empty string. */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const parseIso = (value: string): Date | null => {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export function DatePicker({ label, value, onChange, placeholder = "Any date" }: DatePickerProps) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const selected = parseIso(value);
  const [open, setOpen] = useState(false);
  /** Set when the calendar opens, so no clock is read during render or prerender. */
  const [view, setView] = useState<{ year: number; month: number; today: Date } | null>(null);

  const toggle = () => {
    if (!open) {
      const today = new Date();
      const base = selected ?? today;
      setView({ year: base.getFullYear(), month: base.getMonth(), today });
    }
    setOpen((current) => !current);
  };

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const esc = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const grid = view ? buildMonthGrid(view.year, view.month) : [];

  const pick = (date: Date) => {
    onChange(toIsoDate(date));
    setOpen(false);
  };

  return (
    <div ref={root} className="relative">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text/90">
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
        className="field flex items-center justify-between gap-3 text-left"
      >
        <span className={clsx(!selected && "text-[#5d7084]")}>{selected ? formatDate(value) : placeholder}</span>
        <CalendarDays size={18} className={clsx("transition-colors", open ? "text-mint" : "text-muted")} aria-hidden />
      </button>

      <div
        role="dialog"
        aria-label={`Choose ${label.toLowerCase()}`}
        data-open={open}
        className="pop glass glass-strong absolute z-40 mt-2 w-[19.5rem] max-w-[calc(100vw-2rem)] rounded-3xl p-4"
      >
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setView((v) => v && { ...v, ...shiftMonth(v.year, v.month, -1) })}
            className="grid size-9 place-items-center rounded-full transition hover:bg-white/10"
          >
            <ChevronLeft size={18} />
          </button>
          <span aria-live="polite" className="text-sm font-semibold">
            {view && monthLabel(view.year, view.month)}
          </span>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setView((v) => v && { ...v, ...shiftMonth(v.year, v.month, 1) })}
            className="grid size-9 place-items-center rounded-full transition hover:bg-white/10"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[0.7rem] font-semibold tracking-wide text-muted uppercase">
          {WEEKDAYS.map((day) => (
            <span key={day} className="py-1">
              {day}
            </span>
          ))}
        </div>

        <div role="grid" className="mt-1 grid grid-cols-7 gap-1">
          {grid.map((date, index) =>
            date ? (
              <button
                key={index}
                type="button"
                className="cal-day"
                aria-pressed={selected ? isSameDay(date, selected) : false}
                data-today={view ? isSameDay(date, view.today) : false}
                aria-label={formatDate(toIsoDate(date))}
                onClick={() => pick(date)}
              >
                {date.getDate()}
              </button>
            ) : (
              <span key={index} aria-hidden />
            ),
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
          <button type="button" className="text-mint hover:underline" onClick={() => pick(new Date())}>
            Today
          </button>
          {value && (
            <button
              type="button"
              className="flex items-center gap-1 text-muted hover:text-text"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              <X size={14} aria-hidden /> Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
