import { describe, expect, it } from "vitest";
import { isValidIban, isValidSwift, validateBankDetails, type BankDetailsInput } from "./bank";

const valid: BankDetailsInput = {
  accountType: "international",
  currency: "GBP",
  bankName: "Barclays",
  accountHolder: "Alex O'Neil-Morgan",
  accountNumber: "GB82 WEST 1234 5698 7654 32",
  branch: "",
  swift: "bark gb22",
};

describe("isValidIban", () => {
  it("accepts a correct IBAN with spaces and lower case", () => {
    expect(isValidIban("gb82 west 1234 5698 7654 32")).toBe(true);
  });
  it("rejects a bad checksum", () => {
    expect(isValidIban("GB82WEST12345698765433")).toBe(false);
  });
  it("rejects the wrong shape", () => {
    expect(isValidIban("12345")).toBe(false);
  });
});

describe("isValidSwift", () => {
  it.each(["BARCGB22", "BARCGB22XXX", "deutdeff"])("accepts %s", (code) => {
    expect(isValidSwift(code)).toBe(true);
  });
  it.each(["BARC", "BARCGB2", "1234GB22", "BARCGB22XX"])("rejects %s", (code) => {
    expect(isValidSwift(code)).toBe(false);
  });
});

describe("validateBankDetails", () => {
  it("normalises valid input", () => {
    const result = validateBankDetails(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.accountNumber).toBe("GB82WEST12345698765432");
      expect(result.data.swift).toBe("BARKGB22");
    }
  });

  it("reports every missing required field", () => {
    const result = validateBankDetails({
      ...valid,
      bankName: "",
      accountHolder: "",
      accountNumber: "",
      swift: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.errors).sort()).toEqual(
        ["accountHolder", "accountNumber", "bankName", "swift"].sort(),
      );
    }
  });

  it("makes SWIFT optional for local accounts", () => {
    const result = validateBankDetails({
      ...valid,
      accountType: "local",
      accountNumber: "00123456789",
      swift: "",
    });
    expect(result.success).toBe(true);
  });

  it("still validates a SWIFT code that was provided on a local account", () => {
    const result = validateBankDetails({ ...valid, accountType: "local", swift: "NOPE" });
    expect(!result.success && result.errors.swift).toMatch(/8 or 11/);
  });

  it("rejects digits in the holder name", () => {
    const result = validateBankDetails({ ...valid, accountHolder: "Alex 123" });
    expect(!result.success && result.errors.accountHolder).toBeTruthy();
  });

  it("rejects short account numbers", () => {
    const result = validateBankDetails({ ...valid, accountType: "local", accountNumber: "123" });
    expect(!result.success && result.errors.accountNumber).toMatch(/6 to 34/);
  });
});
