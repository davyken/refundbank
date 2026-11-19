export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDocument {
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
}

const DEMO_NOTE =
  "Refund Bank is currently a demonstration. The details below are a template to be completed and reviewed by the operating company's legal adviser before launch.";

export const LEGAL: Record<"notice" | "privacy" | "terms" | "cookies", LegalDocument> = {
  notice: {
    title: "Legal notice",
    summary: "Who publishes this service, who hosts it and how to reach us.",
    updated: "19 November 2026",
    sections: [
      { heading: "Publisher", body: ["Refund Bank, publisher of this website and application.", "Registered company name, registration number and registered office: to be completed.", "Contact: support@refundbank.example"] },
      { heading: "Publication director", body: ["To be completed."] },
      { heading: "Hosting", body: ["Hosting provider name and address: to be completed."] },
      { heading: "Intellectual property", body: ["The name, logo, texts and interface are protected. Photographs come from Unsplash and are used under the Unsplash licence."] },
      { heading: "Status of this version", body: [DEMO_NOTE] },
    ],
  },
  privacy: {
    title: "Privacy policy",
    summary: "What data we handle to pay your refunds, and what we do to protect it.",
    updated: "19 November 2026",
    sections: [
      { heading: "Data we collect", body: ["Bank name, account holder's name, account number or IBAN, optional branch and SWIFT/BIC code, the refund currency, and the refunds linked to your transactions."] },
      { heading: "Why we use it", body: ["Only to send refunds for cancelled transactions, returned payments and eligible service cancellations, and to notify you when a refund is initiated or completed."] },
      { heading: "Who can see it", body: ["Banking information is encrypted and available only to authorised refund administrators and the payment service that executes the refund. Your account number is masked in the interface."] },
      { heading: "Your rights", body: ["You can update or remove your bank details at any time from the Bank details page, and ask us to access or delete your data through the contact address."] },
      { heading: "Retention", body: ["Bank details are kept while they are needed to process refunds and for the legal retention period that applies to financial records."] },
      { heading: "Status of this version", body: [DEMO_NOTE, "In this demo, details you enter are stored only in your own browser."] },
    ],
  },
  terms: {
    title: "Terms of use",
    summary: "The rules for using the Refund Bank service.",
    updated: "19 November 2026",
    sections: [
      { heading: "Purpose", body: ["Refund Bank lets you register the bank account where your refunds are paid and follow their progress."] },
      { heading: "Your responsibilities", body: ["Provide accurate details and keep them up to date. Refunds sent to an account you entered incorrectly may be delayed or returned."] },
      { heading: "Refund timing", body: ["Banks usually credit a refund within 5 to 10 business days after it is initiated. International transfers can take longer. These are typical delays, not guarantees."] },
      { heading: "Availability", body: ["We work to keep the service available but cannot guarantee uninterrupted access."] },
      { heading: "Status of this version", body: [DEMO_NOTE] },
    ],
  },
  cookies: {
    title: "Cookie policy",
    summary: "How this site uses your browser's storage.",
    updated: "19 November 2026",
    sections: [
      { heading: "What we store", body: ["A session flag remembers that you have already seen the opening animation. In the demo, your saved bank details are kept in your browser's local storage."] },
      { heading: "What we do not do", body: ["This demo does not use advertising or tracking cookies."] },
      { heading: "Control", body: ["You can clear this data at any time from your browser settings. Removing it resets the demo."] },
    ],
  },
};
