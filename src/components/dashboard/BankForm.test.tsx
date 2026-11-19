import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BankForm } from "./BankForm";

async function fillValid() {
  await userEvent.type(screen.getByLabelText(/bank name/i), "Atlas Bank");
  await userEvent.type(screen.getByLabelText(/account holder/i), "Alex Morgan");
  await userEvent.type(screen.getByLabelText(/account number/i), "00123456789");
}

describe("BankForm", () => {
  it("blocks submission and lists errors when required fields are empty", async () => {
    const onSave = vi.fn();
    render(<BankForm onSave={onSave} />);
    await userEvent.click(screen.getByRole("button", { name: /review details/i }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThanOrEqual(3);
    expect(screen.getByLabelText(/bank name/i)).toHaveAttribute("aria-invalid", "true");
    expect(onSave).not.toHaveBeenCalled();
  });

  it("clears an error as soon as the field is fixed", async () => {
    render(<BankForm onSave={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: /review details/i }));
    await userEvent.type(screen.getByLabelText(/bank name/i), "Atlas Bank");
    expect(screen.getByLabelText(/bank name/i)).toHaveAttribute("aria-invalid", "false");
  });

  it("shows the account holder for confirmation before saving", async () => {
    const onSave = vi.fn();
    render(<BankForm onSave={onSave} />);
    await fillValid();
    await userEvent.click(screen.getByRole("button", { name: /review details/i }));

    expect(screen.getByText("Confirm the account holder")).toBeInTheDocument();
    expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
    expect(screen.getByText(/6789/)).toBeInTheDocument();
    expect(screen.queryByText("00123456789")).not.toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /confirm and save/i }));
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ accountHolder: "Alex Morgan", accountNumber: "00123456789" }),
    );
  });

  it("lets the user go back and edit", async () => {
    render(<BankForm onSave={vi.fn()} />);
    await fillValid();
    await userEvent.click(screen.getByRole("button", { name: /review details/i }));
    await userEvent.click(screen.getByRole("button", { name: /edit details/i }));
    expect(screen.getByLabelText(/bank name/i)).toHaveValue("Atlas Bank");
  });

  it("requires SWIFT for international accounts", async () => {
    render(<BankForm onSave={vi.fn()} />);
    await userEvent.click(screen.getByRole("combobox", { name: /account type/i }));
    await userEvent.click(screen.getByRole("option", { name: /international/i, hidden: true }));
    await fillValid();
    await userEvent.click(screen.getByRole("button", { name: /review details/i }));
    expect(screen.getByText(/swift\/bic is required/i)).toBeInTheDocument();
  });
});
