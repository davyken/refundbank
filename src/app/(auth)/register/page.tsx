import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Create account | Refund Bank" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="It takes under a minute. Add your bank details next."
      footer={
        <>
          Already registered? <Link href="/login" className="font-semibold text-mint hover:underline">Sign in</Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
