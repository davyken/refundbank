import type { BankDetails } from "../validation/bank";
import { demoRefunds } from "./demo";
import type { Refund } from "./types";

/**
 * Data access seam. The UI only knows these interfaces, so linking the real
 * backend means writing new implementations and changing `repositories` below.
 */
export interface BankRepository {
  get(): Promise<BankDetails | null>;
  save(details: BankDetails): Promise<void>;
  remove(): Promise<void>;
}

export interface RefundRepository {
  list(): Promise<Refund[]>;
}

export const BANK_STORAGE_KEY = "refund-bank:details";

export function createLocalBankRepository(storage: Storage | undefined): BankRepository {
  return {
    async get() {
      const raw = storage?.getItem(BANK_STORAGE_KEY);
      if (!raw) return null;
      try {
        return JSON.parse(raw) as BankDetails;
      } catch {
        return null;
      }
    },
    async save(details) {
      storage?.setItem(BANK_STORAGE_KEY, JSON.stringify(details));
    },
    async remove() {
      storage?.removeItem(BANK_STORAGE_KEY);
    },
  };
}

export const demoRefundRepository: RefundRepository = {
  async list() {
    return demoRefunds;
  },
};
