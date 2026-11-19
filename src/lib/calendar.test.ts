import { describe, expect, it } from "vitest";
import { buildMonthGrid, isSameDay, monthLabel, shiftMonth } from "./calendar";

describe("buildMonthGrid", () => {
  it("pads to whole weeks starting on Monday", () => {
    const grid = buildMonthGrid(2026, 10); // November 2026 starts on a Sunday
    expect(grid.length % 7).toBe(0);
    expect(grid.slice(0, 6).every((cell) => cell === null)).toBe(true);
    expect(grid[6]?.getDate()).toBe(1);
  });
  it("contains every day of the month once", () => {
    const days = buildMonthGrid(2028, 1).filter(Boolean);
    expect(days).toHaveLength(29); // leap year
  });
});

describe("shiftMonth", () => {
  it("rolls over the year boundary", () => {
    expect(shiftMonth(2026, 11, 1)).toEqual({ year: 2027, month: 0 });
    expect(shiftMonth(2026, 0, -1)).toEqual({ year: 2025, month: 11 });
  });
});

describe("helpers", () => {
  it("compares days ignoring time", () => {
    expect(isSameDay(new Date(2026, 1, 1, 3), new Date(2026, 1, 1, 22))).toBe(true);
    expect(isSameDay(new Date(2026, 1, 1), new Date(2026, 1, 2))).toBe(false);
  });
  it("labels months", () => {
    expect(monthLabel(2026, 10)).toBe("November 2026");
  });
});
