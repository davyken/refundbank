import { describe, expect, it } from "vitest";
import { getScrollRatio } from "./ScrollProgress";

describe("getScrollRatio", () => {
  it("is 0 at the top and 1 at the bottom", () => {
    expect(getScrollRatio(0, 3000, 1000)).toBe(0);
    expect(getScrollRatio(2000, 3000, 1000)).toBe(1);
  });
  it("is proportional in between", () => {
    expect(getScrollRatio(500, 3000, 1000)).toBe(0.25);
  });
  it("clamps and handles pages that do not scroll", () => {
    expect(getScrollRatio(9999, 3000, 1000)).toBe(1);
    expect(getScrollRatio(10, 800, 1000)).toBe(0);
  });
});
