import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/LegalPage";
import { LEGAL } from "@/components/landing/legal-content";

export const metadata: Metadata = {
  title: `${LEGAL.cookies.title} | Refund Bank`,
  description: LEGAL.cookies.summary,
};

export default function Page() {
  return <LegalPage document={LEGAL.cookies} />;
}
