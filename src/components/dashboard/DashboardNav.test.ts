import { describe, expect, it } from "vitest";
import { isActivePath } from "./DashboardNav";

describe("isActivePath", () => {
  it("matches the overview only on the exact path", () => {
    expect(isActivePath("/dashboard", "/dashboard")).toBe(true);
    expect(isActivePath("/dashboard/bank", "/dashboard")).toBe(false);
  });
  it("matches nested routes", () => {
    expect(isActivePath("/dashboard/bank", "/dashboard/bank")).toBe(true);
    expect(isActivePath("/dashboard/refunds", "/dashboard/bank")).toBe(false);
  });
});
