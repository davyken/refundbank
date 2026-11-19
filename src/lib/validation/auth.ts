import { z } from "zod";

const email = z.string().trim().min(1, "Enter your email").email("Enter a valid email address");

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password").min(8, "Password must have at least 8 characters"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email,
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .regex(/[A-Za-z]/, "Add at least one letter")
    .regex(/\d/, "Add at least one digit"),
});

export type LoginInput = z.input<typeof loginSchema>;
export type RegisterInput = z.input<typeof registerSchema>;

export type AuthResult<T> = { success: true; data: T } | { success: false; errors: Partial<Record<keyof T, string>> };

function run<S extends z.ZodType>(schema: S, input: unknown): AuthResult<z.output<S>> {
  const result = schema.safeParse(input);
  if (result.success) return { success: true, data: result.data };
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0]);
    if (!errors[key]) errors[key] = issue.message;
  }
  return { success: false, errors } as AuthResult<z.output<S>>;
}

export const validateLogin = (input: LoginInput) => run(loginSchema, input);
export const validateRegister = (input: RegisterInput) => run(registerSchema, input);
