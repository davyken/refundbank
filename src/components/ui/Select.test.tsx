import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select, nextIndex } from "./Select";

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Bravo" },
  { value: "c", label: "Charlie" },
];

function setup(onChange = vi.fn()) {
  render(<Select label="Letter" value="a" options={options} onChange={onChange} />);
  return { onChange, trigger: screen.getByRole("combobox", { name: "Letter" }) };
}

describe("nextIndex", () => {
  it("wraps in both directions", () => {
    expect(nextIndex(2, 1, 3)).toBe(0);
    expect(nextIndex(0, -1, 3)).toBe(2);
  });
});

describe("Select", () => {
  it("shows the selected label and starts closed", () => {
    const { trigger } = setup();
    expect(trigger).toHaveTextContent("Alpha");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens on click and selects an option with the mouse", async () => {
    const { trigger, onChange } = setup();
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(screen.getByRole("option", { name: "Bravo", hidden: true }));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports the keyboard", async () => {
    const { trigger, onChange } = setup();
    trigger.focus();
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("closes on Escape without changing", async () => {
    const { trigger, onChange } = setup();
    await userEvent.click(trigger);
    await userEvent.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("closes when clicking outside", async () => {
    const { trigger } = setup();
    await userEvent.click(trigger);
    await userEvent.click(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("announces errors", () => {
    render(<Select label="X" value="a" options={options} onChange={() => {}} error="Pick one" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Pick one");
  });
});
