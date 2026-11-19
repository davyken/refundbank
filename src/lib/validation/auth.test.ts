import { describe, expect, it } from "vitest";
import { validateLogin, validateRegister } from "./auth";

describe("validateLogin", () => {
  it("accepts a valid email and password", () => {
    expect(validateLogin({ email: " a@b.co ", password: "longenough" })).toEqual({
      success: true,
      data: { email: "a@b.co", password: "longenough" },
    });
  });
  it("reports both fields when empty", () => {
    const result = validateLogin({ email: "", password: "" });
    expect(!result.success && Object.keys(result.errors)).toEqual(["email", "password"]);
  });
  it("rejects a bad email and a short password", () => {
    const result = validateLogin({ email: "nope", password: "short" });
    expect(!result.success && result.errors.email).toMatch(/valid email/);
    expect(!result.success && result.errors.password).toMatch(/8 characters/);
  });
});

describe("validateRegister", () => {
  const valid = { name: "Alex Morgan", email: "a@b.co", password: "Passw0rdOK" };
  it("accepts valid input", () => {
    expect(validateRegister(valid).success).toBe(true);
  });
  it("requires a letter and a digit in the password", () => {
    const noDigit = validateRegister({ ...valid, password: "onlyletters" });
    const noLetter = validateRegister({ ...valid, password: "12345678" });
    expect(!noDigit.success && noDigit.errors.password).toMatch(/digit/);
    expect(!noLetter.success && noLetter.errors.password).toMatch(/letter/);
  });
  it("requires a name", () => {
    const result = validateRegister({ ...valid, name: "A" });
    expect(!result.success && result.errors.name).toBeTruthy();
  });
});
