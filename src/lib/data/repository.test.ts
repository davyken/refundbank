import { beforeEach, describe, expect, it } from "vitest";
import type { BankDetails } from "../validation/bank";
import { BANK_STORAGE_KEY, createLocalBankRepository, demoRefundRepository } from "./repository";

const details: BankDetails = {
  accountType: "local",
  currency: "EUR",
  bankName: "Atlas Bank",
  accountHolder: "Alex Morgan",
  accountNumber: "00123456789",
  branch: "Central",
  swift: "",
};

describe("local bank repository", () => {
  beforeEach(() => localStorage.clear());

  it("returns null when nothing is saved", async () => {
    expect(await createLocalBankRepository(localStorage).get()).toBeNull();
  });
  it("saves, reads and removes details", async () => {
    const repo = createLocalBankRepository(localStorage);
    await repo.save(details);
    expect(await repo.get()).toEqual(details);
    await repo.remove();
    expect(await repo.get()).toBeNull();
  });
  it("survives corrupted storage", async () => {
    localStorage.setItem(BANK_STORAGE_KEY, "{oops");
    expect(await createLocalBankRepository(localStorage).get()).toBeNull();
  });
  it("tolerates a missing storage", async () => {
    const repo = createLocalBankRepository(undefined);
    await expect(repo.save(details)).resolves.toBeUndefined();
    expect(await repo.get()).toBeNull();
  });
});

describe("demo refund repository", () => {
  it("lists refunds linked to a transaction", async () => {
    const refunds = await demoRefundRepository.list();
    expect(refunds.length).toBeGreaterThan(0);
    expect(refunds.every((r) => r.transactionId.startsWith("TX-"))).toBe(true);
  });
});
