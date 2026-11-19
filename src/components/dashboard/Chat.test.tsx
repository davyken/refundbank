import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import { Chat } from "./Chat";

beforeAll(() => {
  Element.prototype.scrollTo = () => {};
});

describe("Chat", () => {
  it("starts with the support greeting", () => {
    render(<Chat replyDelay={0} />);
    expect(screen.getByText(/I'm Noor/)).toBeInTheDocument();
  });

  it("disables send until something is typed", async () => {
    render(<Chat replyDelay={0} />);
    const send = screen.getByRole("button", { name: /send message/i });
    expect(send).toBeDisabled();
    await userEvent.type(screen.getByLabelText("Message"), "hi");
    expect(send).toBeEnabled();
  });

  it("shows the user message and then a scripted reply", async () => {
    render(<Chat replyDelay={10} />);
    await userEvent.type(screen.getByLabelText("Message"), "How long does it take?{Enter}");
    expect(screen.getByText("How long does it take?")).toBeInTheDocument();
    expect(await screen.findByText(/5 to 10 business days/)).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });

  it("sends a suggestion with one click", async () => {
    render(<Chat replyDelay={10} />);
    await userEvent.click(screen.getByRole("button", { name: "What is a SWIFT code?" }));
    expect(await screen.findByText(/8 or 11 characters/)).toBeInTheDocument();
  });
});
