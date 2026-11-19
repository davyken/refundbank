"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { registerUser } from "@/lib/auth/session";
import { validateRegister, type RegisterInput } from "@/lib/validation/auth";
import { TextField } from "../ui/TextField";

export function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<RegisterInput>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterInput, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof RegisterInput, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) {
      const result = validateRegister(next);
      setErrors(result.success ? {} : result.errors);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    const result = validateRegister(values);
    if (!result.success) return setErrors(result.errors);
    registerUser(result.data.name, result.data.email, localStorage);
    router.replace("/dashboard");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 [@media(max-height:640px)]:space-y-2.5">
      <TextField label="Full name" autoComplete="name" placeholder="Alex Morgan" value={values.name} onChange={(v) => update("name", v)} error={errors.name} />
      <TextField label="Email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(v) => update("email", v)} error={errors.email} />
      <TextField label="Password" type="password" autoComplete="new-password" placeholder="8+ characters, a letter and a digit" value={values.password} onChange={(v) => update("password", v)} error={errors.password} />
      <button type="submit" className="btn btn-primary w-full">
        Create account <ArrowRight size={18} aria-hidden />
      </button>
      <p className="[@media(max-height:640px)]:hidden text-center text-xs text-muted">
        By creating an account you accept the terms of use. Demo only, nothing is sent to a server.
      </p>
    </form>
  );
}
