import { describe, expect, it } from "vitest";
import { demoRefunds } from "./demo";
import { filterRefunds, summarizeRefunds } from "./summary";

describe("summarizeRefunds", () => {
  const summary = summarizeRefunds(demoRefunds);
  it("splits pending from completed", () => {
    expect(summary.pendingCount).toBe(2);
    expect(summary.completedCount).toBe(3);
  });
  it("adds amounts without floating point noise", () => {
    expect(summary.pendingTotal).toBe(557.9);
    expect(summary.completedTotal).toBe(376.49);
  });
  it("handles an empty list", () => {
    expect(summarizeRefunds([])).toEqual({ pendingTotal: 0, completedTotal: 0, pendingCount: 0, completedCount: 0 });
  });
});

describe("filterRefunds", () => {
  it("returns everything newest first by default", () => {
    const list = filterRefunds(demoRefunds, { status: "all", from: "" });
    expect(list).toHaveLength(demoRefunds.length);
    expect(list[0].id).toBe("rf_1041");
  });
  it("filters by status", () => {
    const list = filterRefunds(demoRefunds, { status: "completed", from: "" });
    expect(list.every((r) => r.status === "completed")).toBe(true);
  });
  it("filters by start date inclusively", () => {
    const list = filterRefunds(demoRefunds, { status: "all", from: "2026-11-12" });
    expect(list.map((r) => r.id)).toEqual(["rf_1041", "rf_1042"]);
  });
  it("does not mutate the input", () => {
    const copy = [...demoRefunds];
    filterRefunds(demoRefunds, { status: "all", from: "" });
    expect(demoRefunds).toEqual(copy);
  });
});
