import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/LegalPage";
import { LEGAL } from "@/components/landing/legal-content";

export const metadata: Metadata = {
  title: `${LEGAL.terms.title} | Refund Bank`,
  description: LEGAL.terms.summary,
};

export default function Page() {
  return <LegalPage document={LEGAL.terms} />;
}
