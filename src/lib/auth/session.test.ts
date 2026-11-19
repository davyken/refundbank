import { beforeEach, describe, expect, it } from "vitest";
import { SESSION_KEY, nameFromEmail, parseSession, registerUser, signIn, signOut } from "./session";

beforeEach(() => localStorage.clear());

describe("parseSession", () => {
  it("reads a valid session", () => {
    expect(parseSession('{"name":"Alex","email":"a@b.co"}')).toEqual({ name: "Alex", email: "a@b.co" });
  });
  it.each([null, "", "{oops", '{"name":1}', "[]"])("rejects %s", (raw) => {
    expect(parseSession(raw)).toBeNull();
  });
});

describe("nameFromEmail", () => {
  it("builds a readable name", () => {
    expect(nameFromEmail("alex.morgan@mail.com")).toBe("Alex Morgan");
    expect(nameFromEmail("jo_smith-lee@mail.com")).toBe("Jo Smith Lee");
  });
  it("falls back for odd input", () => {
    expect(nameFromEmail("@mail.com")).toBe("Customer");
  });
});

describe("session lifecycle", () => {
  it("registers, starts a session and remembers the name for later sign in", () => {
    registerUser("Alex Morgan", "Alex@Mail.com", localStorage);
    expect(parseSession(localStorage.getItem(SESSION_KEY))?.email).toBe("alex@mail.com");
    signOut(localStorage);
    expect(localStorage.getItem(SESSION_KEY)).toBeNull();
    expect(signIn("ALEX@mail.com", localStorage).name).toBe("Alex Morgan");
  });
  it("derives a name for unknown emails", () => {
    expect(signIn("sam.lee@mail.com", localStorage).name).toBe("Sam Lee");
  });
  it("never stores a password", () => {
    registerUser("Alex", "a@b.co", localStorage);
    expect(JSON.stringify({ ...localStorage })).not.toMatch(/password/i);
  });
});
