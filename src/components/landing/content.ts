export const NAV_LINKS = [
  { href: "/why-it-matters", label: "Why it matters" },
  { href: "/features", label: "Features" },
  { href: "/devices", label: "Desktop and mobile" },
  { href: "/security", label: "Security" },
  { href: "/faq", label: "FAQ" },
] as const;

export const LEGAL_LINKS = [
  { href: "/legal/notice", label: "Legal notice" },
  { href: "/legal/privacy", label: "Privacy policy" },
  { href: "/legal/terms", label: "Terms of use" },
  { href: "/legal/cookies", label: "Cookie policy" },
] as const;

/** Demo contact details on a reserved example domain. Replace before launch. */
export const CONTACT = {
  email: "support@refundbank.example",
  phone: "+000 000 000 000",
  address: "Demo address, to be completed",
  hours: "Monday to Friday, 8:00 to 18:00",
} as const;

export const REFUND_REASONS = [
  "Cancelled flights",
  "Returned payments",
  "Duplicate charges",
  "Cancelled bookings",
  "Service cancellations",
  "Failed deliveries",
  "Overpayments",
  "Event cancellations",
];

/** Facts about bank identifiers and payout timing. Counters animate to `value`. */
export const FACTS = [
  { value: 8, suffix: " or 11", label: "characters in a SWIFT/BIC code", note: "It identifies the bank, the country and the branch." },
  { value: 34, suffix: "", label: "characters at most in an IBAN", note: "Two checksum digits catch most typing mistakes." },
  { value: 10, suffix: " days", label: "business days, the usual wait for a bank credit", note: "Once a refund has been initiated." },
] as const;

export const FEATURES = [
  {
    code: "FR01",
    title: "Tell us where the money goes",
    text: "Bank name, account holder, account number or IBAN, an optional branch and a SWIFT/BIC code when the account is international. One short form, nothing you will not need.",
  },
  {
    code: "FR02",
    title: "Mistakes are caught before they cost you",
    text: "Every field is checked as you type. IBAN checksums and SWIFT formats are verified, and the account holder is shown back to you for confirmation before anything is saved.",
  },
  {
    code: "FR03",
    title: "Saved once, updated when life changes",
    text: "Changed banks? Edit or remove your details in a few taps. Your account number stays masked on screen, showing only the last four digits.",
  },
  {
    code: "FR04",
    title: "Every refund tied to its transaction",
    text: "Each refund shows the merchant, the transaction reference and a clear status. You are notified when a refund is initiated and again when it reaches your bank.",
  },
] as const;

export const STEPS = [
  { title: "Add your bank details", text: "Enter them once. We validate the format of each field while you type." },
  { title: "Confirm the account holder", text: "A summary shows the name exactly as it will appear on the transfer." },
  { title: "Follow your refund", text: "Track every refund from initiated to completed, and chat with support from the same screen." },
] as const;

export const SECURITY_POINTS = [
  { title: "Masked by default", text: "Only the last four characters of your account number are displayed in the app." },
  { title: "Encrypted storage", text: "The service stores banking data encrypted. Access is limited to authorised refund staff." },
  { title: "Roles and boundaries", text: "Customers manage their own details. Administrators review requests. The payment service only reads what it needs." },
  { title: "Incomplete data never goes through", text: "Invalid or partial details are blocked before they can be submitted." },
] as const;

export const FAQ = [
  {
    q: "Which bank details do I need?",
    a: "Your bank name, the account holder's name and your account number or IBAN. A branch is optional. For an international account you also need the SWIFT/BIC code, which is printed on your bank statements and in your online banking.",
  },
  {
    q: "How long does a refund take?",
    a: "After a refund is initiated, banks usually credit the account within 5 to 10 business days. International transfers can take longer. You get a notification at each step.",
  },
  {
    q: "Can I change my bank account later?",
    a: "Yes. Open Bank details, edit and save. Refunds already in progress keep using the details that were saved when they were initiated.",
  },
  {
    q: "Does it work on my phone?",
    a: "Yes. The whole experience is designed for both desktop and mobile, with the same features on every screen size.",
  },
  {
    q: "Is this connected to a live bank today?",
    a: "This version runs on demo data so you can explore every screen. The data layer is isolated, so the real backend can be connected without changing the interface.",
  },
] as const;
