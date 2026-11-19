import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Sign in | Refund Bank" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your refund account."
      footer={
        <>
          New here? <Link href="/register" className="font-semibold text-mint hover:underline">Create an account</Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
