import { describe, expect, it } from "vitest";
import { getAgentReply } from "./chat";

describe("getAgentReply", () => {
  it("answers timeline questions", () => {
    expect(getAgentReply("How long does it take?")).toMatch(/5 to 10 business days/);
  });
  it("explains SWIFT codes", () => {
    expect(getAgentReply("what is a swift code")).toMatch(/8 or 11/);
  });
  it("falls back politely", () => {
    expect(getAgentReply("hello")).toMatch(/follow up/);
  });
});
