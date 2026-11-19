import type { Metadata } from "next";
import { Devices } from "@/components/landing/Devices";
import { Cta } from "@/components/landing/Cta";

export const metadata: Metadata = {
  title: "Desktop and mobile | Refund Bank",
  description: "One account on every screen. Refund Bank works on desktop and mobile.",
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Desktop and mobile</h1>
      <div className="pt-4">
        <Devices />
      </div>
      <Cta />
    </>
  );
}
