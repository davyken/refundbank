"use client";

import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  error?: string;
  hint?: string;
}

export function nextIndex(current: number, delta: number, length: number): number {
  return (current + delta + length) % length;
}

export function Select<T extends string>({ label, value, options, onChange, error, hint }: SelectProps<T>) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const [active, setActive] = useState(selectedIndex);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const toggle = () => {
    setActive(selectedIndex);
    setOpen((current) => !current);
  };

  const choose = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const move = (delta: number) => {
      event.preventDefault();
      if (!open) return setOpen(true);
      setActive((index) => nextIndex(index, delta, options.length));
    };
    switch (event.key) {
      case "ArrowDown":
        return move(1);
      case "ArrowUp":
        return move(-1);
      case "Home":
        event.preventDefault();
        return setActive(0);
      case "End":
        event.preventDefault();
        return setActive(options.length - 1);
      case "Enter":
      case " ":
        event.preventDefault();
        return open ? choose(active) : toggle();
      case "Escape":
        return setOpen(false);
      case "Tab":
        return setOpen(false);
    }
  };

  const described = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div ref={root} className="relative">
      <label id={`${id}-label`} className="mb-2 block text-sm font-medium text-text/90">
        {label}
      </label>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={described}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className="field flex items-center justify-between gap-3 text-left"
      >
        <span className="truncate">{options[selectedIndex]?.label}</span>
        <ChevronDown
          size={18}
          aria-hidden
          className={clsx("shrink-0 text-muted transition-transform duration-300", open && "rotate-180 text-mint")}
        />
      </button>

      <ul
        id={`${id}-list`}
        role="listbox"
        aria-labelledby={`${id}-label`}
        data-open={open}
        data-lenis-prevent
        className="pop glass glass-strong absolute z-40 mt-2 max-h-64 w-full overflow-auto rounded-2xl p-1.5"
      >
        {options.map((option, index) => {
          const selected = option.value === value;
          return (
            <li
              key={option.value}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={selected}
              onMouseEnter={() => setActive(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
              className={clsx(
                "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                index === active ? "bg-mint/15 text-white" : "text-text/85",
                selected && "font-semibold",
              )}
            >
              {option.label}
              {selected && <Check size={16} className="text-mint" aria-hidden />}
            </li>
          );
        })}
      </ul>

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-[#f4a3a3]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
