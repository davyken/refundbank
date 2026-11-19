import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { demoRefunds } from "@/lib/data/demo";
import { RefundList } from "./RefundList";

describe("RefundList", () => {
  it("renders one row per refund with its transaction", () => {
    render(<RefundList refunds={demoRefunds} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(demoRefunds.length);
    expect(screen.getByText("TX-88213")).toBeInTheDocument();
  });
  it("shows an empty state", () => {
    render(<RefundList refunds={[]} />);
    expect(screen.getByText(/no refunds match/i)).toBeInTheDocument();
  });
});
