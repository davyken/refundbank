import type { Metadata } from "next";
import { Faq } from "@/components/landing/Faq";
import { Cta } from "@/components/landing/Cta";

export const metadata: Metadata = {
  title: "FAQ | Refund Bank",
  description: "Answers about bank details, refund timelines and the demo.",
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">FAQ</h1>
      <div className="pt-28 sm:pt-32">
        <Faq />
      </div>
      <Cta />
    </>
  );
}
