import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("shows the placeholder when empty", () => {
    render(<DatePicker label="From" value="" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: /from/i })).toHaveTextContent("Any date");
  });

  it("shows a formatted value", () => {
    render(<DatePicker label="From" value="2026-03-05" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: /from/i })).toHaveTextContent("05 Mar 2026");
  });

  it("emits an ISO date when a day is chosen", async () => {
    const onChange = vi.fn();
    render(<DatePicker label="From" value="2026-03-05" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: /from/i }));
    await userEvent.click(screen.getByRole("button", { name: "12 Mar 2026", hidden: true }));
    expect(onChange).toHaveBeenCalledWith("2026-03-12");
  });

  it("navigates months", async () => {
    render(<DatePicker label="From" value="2026-03-05" onChange={() => {}} />);
    await userEvent.click(screen.getByRole("button", { name: /from/i }));
    await userEvent.click(screen.getByRole("button", { name: "Next month", hidden: true }));
    expect(screen.getByText("April 2026")).toBeInTheDocument();
  });

  it("clears the value", async () => {
    const onChange = vi.fn();
    render(<DatePicker label="From" value="2026-03-05" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: /from/i }));
    await userEvent.click(screen.getByRole("button", { name: /clear/i, hidden: true }));
    expect(onChange).toHaveBeenCalledWith("");
  });
});
