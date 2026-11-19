import { describe, expect, it } from "vitest";
import { demoRefunds } from "./demo";
import { buildNotifications } from "./notifications";

describe("buildNotifications", () => {
  const feed = buildNotifications(demoRefunds);

  it("creates one initiated entry per refund", () => {
    expect(feed.filter((n) => n.kind === "initiated")).toHaveLength(demoRefunds.length);
  });
  it("creates completed entries only for completed refunds", () => {
    const completed = demoRefunds.filter((r) => r.status === "completed").length;
    expect(feed.filter((n) => n.kind === "completed")).toHaveLength(completed);
  });
  it("is sorted newest first", () => {
    const dates = feed.map((n) => n.at);
    expect(dates).toEqual([...dates].sort().reverse());
  });
});
