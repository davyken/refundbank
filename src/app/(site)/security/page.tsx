import type { Metadata } from "next";
import { Security } from "@/components/landing/Security";
import { Cta } from "@/components/landing/Cta";

export const metadata: Metadata = {
  title: "Security | Refund Bank",
  description: "How Refund Bank protects bank details: masking, encryption, roles and validation.",
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Security</h1>
      <div className="pt-28 sm:pt-32">
        <Security />
      </div>
      <Cta />
    </>
  );
}
