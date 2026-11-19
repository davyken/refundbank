"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signIn } from "@/lib/auth/session";
import { validateLogin, type LoginInput } from "@/lib/validation/auth";
import { TextField } from "../ui/TextField";

const DEMO_ACCOUNT: LoginInput = { email: "alex.morgan@example.com", password: "Demo1234" };

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginInput>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof LoginInput, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) {
      const result = validateLogin(next);
      setErrors(result.success ? {} : result.errors);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    const result = validateLogin(values);
    if (!result.success) return setErrors(result.errors);
    signIn(result.data.email, localStorage);
    router.replace("/dashboard");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 [@media(max-height:640px)]:space-y-2.5">
      <TextField label="Email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(v) => update("email", v)} error={errors.email} />
      <TextField label="Password" type="password" autoComplete="current-password" placeholder="Your password" value={values.password} onChange={(v) => update("password", v)} error={errors.password} />
      <button type="submit" className="btn btn-primary w-full">
        Sign in <ArrowRight size={18} aria-hidden />
      </button>
      <button
        type="button"
        className="btn btn-ghost w-full"
        onClick={() => {
          setValues(DEMO_ACCOUNT);
          setErrors({});
        }}
      >
        Fill demo account
      </button>
      <p className="[@media(max-height:640px)]:hidden text-center text-xs text-muted">
        Demo mode: any valid email and a password of 8 or more characters works.
      </p>
    </form>
  );
}
