import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CompoundInterest from "./compound-interest";
import { describe, it, expect } from "vitest";

describe("CompoundInterest Component", () => {
  it("renders correctly with default values", () => {
    render(<CompoundInterest />);
    expect(screen.getByText("Compound Interest Calculator")).toBeInTheDocument();

    // Default Future Value for $1000 at 5% for 10 years compounded annually = $1628.89
    expect(screen.getByText("$1,628.89")).toBeInTheDocument();
    expect(screen.getByText("$628.89")).toBeInTheDocument();
  });

  it("recalculates when principal changes", () => {
    render(<CompoundInterest />);
    const principalInput = screen.getByLabelText("Principal Amount ($)");
    fireEvent.change(principalInput, { target: { value: "2000" } });

    // Future Value for $2000 at 5% for 10 years compounded annually = $3257.79
    expect(screen.getByText("$3,257.79")).toBeInTheDocument();
  });

  it("recalculates when rate changes", () => {
    render(<CompoundInterest />);
    const rateInput = screen.getByLabelText("Annual Interest Rate (%)");
    fireEvent.change(rateInput, { target: { value: "10" } });

    // Future Value for $1000 at 10% for 10 years compounded annually = $2593.74
    expect(screen.getByText("$2,593.74")).toBeInTheDocument();
  });

  it("recalculates when years changes", () => {
    render(<CompoundInterest />);
    const yearsInput = screen.getByLabelText("Years");
    fireEvent.change(yearsInput, { target: { value: "20" } });

    // Future Value for $1000 at 5% for 20 years compounded annually = $2653.30
    expect(screen.getByText("$2,653.30")).toBeInTheDocument();
  });

  it("recalculates when frequency changes", () => {
    render(<CompoundInterest />);
    const frequencySelect = screen.getByLabelText("Compounding Frequency");
    fireEvent.change(frequencySelect, { target: { value: "12" } });

    // Future Value for $1000 at 5% for 10 years compounded monthly = $1647.01
    expect(screen.getByText("$1,647.01")).toBeInTheDocument();
  });

  it("handles invalid inputs gracefully", () => {
    render(<CompoundInterest />);
    const principalInput = screen.getByLabelText("Principal Amount ($)");
    fireEvent.change(principalInput, { target: { value: "" } });

    // If invalid, it returns "-" for currency format
    const hyphens = screen.getAllByText("-");
    expect(hyphens.length).toBe(2);
  });
});
