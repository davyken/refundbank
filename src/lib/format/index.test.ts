import { describe, expect, it } from "vitest";
import { daysBetween, formatCurrency, formatDate, initials, maskAccountNumber, toIsoDate } from "./index";

describe("maskAccountNumber", () => {
  it("keeps only the last four characters", () => {
    expect(maskAccountNumber("GB82 WEST 1234 5698 7654 32")).toBe("•••• 5432");
  });
  it("leaves very short values untouched", () => {
    expect(maskAccountNumber("123")).toBe("123");
  });
});

describe("formatCurrency", () => {
  it("formats two decimals for USD", () => {
    expect(formatCurrency(1234.5, "USD")).toBe("$1,234.50");
  });
  it("drops decimals for XAF", () => {
    expect(formatCurrency(25000, "XAF")).toContain("25,000");
    expect(formatCurrency(25000, "XAF")).not.toContain(".");
  });
});

describe("dates", () => {
  it("formats an ISO date", () => {
    expect(formatDate("2026-03-05")).toBe("05 Mar 2026");
  });
  it("round trips to ISO with local padding", () => {
    expect(toIsoDate(new Date(2026, 0, 9))).toBe("2026-01-09");
  });
  it("counts days between dates", () => {
    expect(daysBetween(new Date(2026, 0, 1), new Date(2026, 0, 11))).toBe(10);
  });
});

describe("initials", () => {
  it("takes two letters", () => {
    expect(initials("alex john morgan")).toBe("AJ");
  });
  it("handles empty strings", () => {
    expect(initials("")).toBe("");
  });
});
