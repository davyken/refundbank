import { z } from "zod";

export const ACCOUNT_TYPES = ["local", "international"] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];

export const CURRENCIES = ["USD", "EUR", "GBP", "XAF", "XOF"] as const;
export type Currency = (typeof CURRENCIES)[number];

const SWIFT_PATTERN = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
const IBAN_SHAPE = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;
const HOLDER_PATTERN = /^[\p{L}][\p{L} .'-]*$/u;

export const normalizeAccountNumber = (value: string): string =>
  value.replace(/[\s-]/g, "").toUpperCase();

export const normalizeSwift = (value: string): string => value.replace(/\s/g, "").toUpperCase();

export const isValidSwift = (value: string): boolean => SWIFT_PATTERN.test(normalizeSwift(value));

/** ISO 13616 mod 97 checksum. */
export function isValidIban(value: string): boolean {
  const iban = normalizeAccountNumber(value);
  if (!IBAN_SHAPE.test(iban)) return false;

  const rearranged = iban.slice(4) + iban.slice(0, 4);
  let remainder = 0;
  for (const char of rearranged) {
    const digits = /\d/.test(char) ? char : String(char.charCodeAt(0) - 55);
    for (const digit of digits) remainder = (remainder * 10 + Number(digit)) % 97;
  }
  return remainder === 1;
}

const looksLikeIban = (value: string) => /^[A-Z]{2}\d{2}/.test(value);

export const bankDetailsSchema = z
  .object({
    accountType: z.enum(ACCOUNT_TYPES),
    currency: z.enum(CURRENCIES),
    bankName: z.string().trim().min(2, "Enter the name of your bank").max(80),
    accountHolder: z
      .string()
      .trim()
      .min(2, "Enter the account holder's full name")
      .max(80)
      .regex(HOLDER_PATTERN, "Use letters, spaces, apostrophes and hyphens only"),
    accountNumber: z.string().transform(normalizeAccountNumber),
    branch: z.string().trim().max(80, "Branch name is too long").optional().default(""),
    swift: z.string().transform(normalizeSwift).optional().default(""),
  })
  .superRefine((data, ctx) => {
    const issue = (path: string, message: string) =>
      ctx.addIssue({ code: "custom", path: [path], message });

    if (!data.accountNumber) {
      issue("accountNumber", "Enter your account number or IBAN");
    } else if (looksLikeIban(data.accountNumber)) {
      if (!isValidIban(data.accountNumber)) issue("accountNumber", "This IBAN is not valid, check for typos");
    } else if (!/^[A-Z0-9]{6,34}$/.test(data.accountNumber)) {
      issue("accountNumber", "Account number must be 6 to 34 letters or digits");
    }

    if (data.accountType === "international" && !data.swift) {
      issue("swift", "SWIFT/BIC is required for international accounts");
    } else if (data.swift && !SWIFT_PATTERN.test(data.swift)) {
      issue("swift", "SWIFT/BIC must be 8 or 11 characters, for example BARCGB22");
    }
  });

export type BankDetailsInput = z.input<typeof bankDetailsSchema>;
export type BankDetails = z.output<typeof bankDetailsSchema>;
export type FieldErrors = Partial<Record<keyof BankDetails, string>>;

export type ValidationResult =
  | { success: true; data: BankDetails }
  | { success: false; errors: FieldErrors };

export function validateBankDetails(input: BankDetailsInput): ValidationResult {
  const result = bankDetailsSchema.safeParse(input);
  if (result.success) return { success: true, data: result.data };

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof BankDetails | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { success: false, errors };
}
