import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RomanNumeralConverter from "./roman-numeral-converter";

describe("RomanNumeralConverter", () => {
  it("renders the component with both inputs", () => {
    render(<RomanNumeralConverter />);
    expect(screen.getByLabelText(/Number/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Roman Numeral/)).toBeInTheDocument();
  });

  it("converts valid number to roman numeral", () => {
    render(<RomanNumeralConverter />);
    const numberInput = screen.getByLabelText(/Number/);
    const romanInput = screen.getByLabelText(/Roman Numeral/);

    fireEvent.change(numberInput, { target: { value: "2024" } });
    expect(romanInput).toHaveValue("MMXXIV");
  });

  it("converts valid roman numeral to number", () => {
    render(<RomanNumeralConverter />);
    const numberInput = screen.getByLabelText(/Number/);
    const romanInput = screen.getByLabelText(/Roman Numeral/);

    fireEvent.change(romanInput, { target: { value: "MCMXCIX" } });
    expect(numberInput).toHaveValue(1999);
  });

  it("shows error for number less than 1", () => {
    render(<RomanNumeralConverter />);
    const numberInput = screen.getByLabelText(/Number/);

    fireEvent.change(numberInput, { target: { value: "0" } });
    expect(screen.getByText("Number must be between 1 and 3999.")).toBeInTheDocument();
  });

  it("shows error for number greater than 3999", () => {
    render(<RomanNumeralConverter />);
    const numberInput = screen.getByLabelText(/Number/);

    fireEvent.change(numberInput, { target: { value: "4000" } });
    expect(screen.getByText("Number must be between 1 and 3999.")).toBeInTheDocument();
  });

  it("shows error for invalid roman numeral structure", () => {
    render(<RomanNumeralConverter />);
    const romanInput = screen.getByLabelText(/Roman Numeral/);

    fireEvent.change(romanInput, { target: { value: "IIII" } });
    expect(screen.getByText("Invalid Roman Numeral.")).toBeInTheDocument();
  });

  it("shows error for invalid roman numeral characters", () => {
    render(<RomanNumeralConverter />);
    const romanInput = screen.getByLabelText(/Roman Numeral/);

    fireEvent.change(romanInput, { target: { value: "ABC" } });
    expect(screen.getByText("Invalid Roman Numeral.")).toBeInTheDocument();
  });

  it("clears inputs when one is emptied", () => {
    render(<RomanNumeralConverter />);
    const numberInput = screen.getByLabelText(/Number/);
    const romanInput = screen.getByLabelText(/Roman Numeral/);

    fireEvent.change(numberInput, { target: { value: "10" } });
    expect(romanInput).toHaveValue("X");

    fireEvent.change(numberInput, { target: { value: "" } });
    expect(romanInput).toHaveValue("");
  });
});