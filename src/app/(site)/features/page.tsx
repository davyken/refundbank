import type { Metadata } from "next";
import { Features } from "@/components/landing/Features";
import { Steps } from "@/components/landing/Steps";
import { Cta } from "@/components/landing/Cta";

export const metadata: Metadata = {
  title: "Features | Refund Bank",
  description: "Everything a refund needs: bank details, validation, updates and refund tracking.",
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Features</h1>
      <div className="pt-28 sm:pt-32">
        <Features />
        <Steps />
      </div>
      <Cta />
    </>
  );
}
