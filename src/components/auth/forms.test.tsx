import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SESSION_KEY, parseSession } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const replace = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }));

beforeEach(() => {
  localStorage.clear();
  replace.mockClear();
});

describe("LoginForm", () => {
  it("shows errors and stays put when empty", async () => {
    render(<LoginForm />);
    await userEvent.click(screen.getByRole("button", { name: /^sign in/i }));
    expect(screen.getAllByRole("alert")).toHaveLength(2);
    expect(replace).not.toHaveBeenCalled();
  });

  it("signs in and goes to the dashboard", async () => {
    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText("Email"), "sam.lee@mail.com");
    await userEvent.type(screen.getByLabelText("Password"), "longenough");
    await userEvent.click(screen.getByRole("button", { name: /^sign in/i }));
    expect(parseSession(localStorage.getItem(SESSION_KEY))?.name).toBe("Sam Lee");
    expect(replace).toHaveBeenCalledWith("/dashboard");
  });

  it("fills the demo account", async () => {
    render(<LoginForm />);
    await userEvent.click(screen.getByRole("button", { name: /fill demo account/i }));
    expect(screen.getByLabelText("Email")).toHaveValue("alex.morgan@example.com");
  });

  it("toggles password visibility", async () => {
    render(<LoginForm />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    await userEvent.click(screen.getByRole("button", { name: /show password/i }));
    expect(input).toHaveAttribute("type", "text");
  });
});

describe("RegisterForm", () => {
  it("rejects a weak password", async () => {
    render(<RegisterForm />);
    await userEvent.type(screen.getByLabelText("Full name"), "Alex Morgan");
    await userEvent.type(screen.getByLabelText("Email"), "a@b.co");
    await userEvent.type(screen.getByLabelText("Password"), "onlyletters");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/digit/i);
    expect(replace).not.toHaveBeenCalled();
  });

  it("creates the account with the chosen name", async () => {
    render(<RegisterForm />);
    await userEvent.type(screen.getByLabelText("Full name"), "Alex Morgan");
    await userEvent.type(screen.getByLabelText("Email"), "a@b.co");
    await userEvent.type(screen.getByLabelText("Password"), "Passw0rdOK");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));
    expect(parseSession(localStorage.getItem(SESSION_KEY))).toEqual({ name: "Alex Morgan", email: "a@b.co" });
    expect(replace).toHaveBeenCalledWith("/dashboard");
  });
});
