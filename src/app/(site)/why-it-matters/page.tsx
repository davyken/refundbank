import type { Metadata } from "next";
import { Marquee } from "@/components/landing/Marquee";
import { Why } from "@/components/landing/Why";
import { Cta } from "@/components/landing/Cta";

export const metadata: Metadata = {
  title: "Why it matters | Refund Bank",
  description: "Most failed refunds come from a typo. See why validating bank details first saves time.",
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Why it matters</h1>
      <div className="pt-4">
        <Why />
        <Marquee />
      </div>
      <Cta />
    </>
  );
}
