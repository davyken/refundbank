import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/LegalPage";
import { LEGAL } from "@/components/landing/legal-content";

export const metadata: Metadata = {
  title: `${LEGAL.privacy.title} | Refund Bank`,
  description: LEGAL.privacy.summary,
};

export default function Page() {
  return <LegalPage document={LEGAL.privacy} />;
}
