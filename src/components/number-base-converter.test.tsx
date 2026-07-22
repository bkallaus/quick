import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NumberBaseConverter from "./number-base-converter";

describe("NumberBaseConverter", () => {
  it("renders with default values", () => {
    render(<NumberBaseConverter />);

    const decimalInput = screen.getByLabelText(/^Decimal/i);
    const binaryInput = screen.getByLabelText(/^Binary/i);
    const octalInput = screen.getByLabelText(/^Octal/i);
    const hexInput = screen.getByLabelText(/^Hexadecimal/i);

    expect(decimalInput).toHaveValue("42");
    expect(binaryInput).toHaveValue("101010");
    expect(octalInput).toHaveValue("52");
    expect(hexInput).toHaveValue("2a");
  });

  it("updates other bases when decimal is changed", () => {
    render(<NumberBaseConverter />);
    const decimalInput = screen.getByLabelText(/^Decimal/i);
    fireEvent.change(decimalInput, { target: { value: "255" } });

    const binaryInput = screen.getByLabelText(/^Binary/i);
    const octalInput = screen.getByLabelText(/^Octal/i);
    const hexInput = screen.getByLabelText(/^Hexadecimal/i);

    expect(binaryInput).toHaveValue("11111111");
    expect(octalInput).toHaveValue("377");
    expect(hexInput).toHaveValue("ff");
  });

  it("updates other bases when binary is changed", () => {
    render(<NumberBaseConverter />);
    const binaryInput = screen.getByLabelText(/^Binary/i);
    fireEvent.change(binaryInput, { target: { value: "101" } });

    const decimalInput = screen.getByLabelText(/^Decimal/i);
    const octalInput = screen.getByLabelText(/^Octal/i);
    const hexInput = screen.getByLabelText(/^Hexadecimal/i);

    expect(decimalInput).toHaveValue("5");
    expect(octalInput).toHaveValue("5");
    expect(hexInput).toHaveValue("5");
  });

  it("updates other bases when octal is changed", () => {
    render(<NumberBaseConverter />);
    const octalInput = screen.getByLabelText(/^Octal/i);
    fireEvent.change(octalInput, { target: { value: "10" } });

    const decimalInput = screen.getByLabelText(/^Decimal/i);
    const binaryInput = screen.getByLabelText(/^Binary/i);
    const hexInput = screen.getByLabelText(/^Hexadecimal/i);

    expect(decimalInput).toHaveValue("8");
    expect(binaryInput).toHaveValue("1000");
    expect(hexInput).toHaveValue("8");
  });

  it("updates other bases when hexadecimal is changed", () => {
    render(<NumberBaseConverter />);
    const hexInput = screen.getByLabelText(/^Hexadecimal/i);
    fireEvent.change(hexInput, { target: { value: "a" } });

    const decimalInput = screen.getByLabelText(/^Decimal/i);
    const binaryInput = screen.getByLabelText(/^Binary/i);
    const octalInput = screen.getByLabelText(/^Octal/i);

    expect(decimalInput).toHaveValue("10");
    expect(binaryInput).toHaveValue("1010");
    expect(octalInput).toHaveValue("12");
  });

  it("clears all inputs when one is cleared", () => {
    render(<NumberBaseConverter />);
    const decimalInput = screen.getByLabelText(/^Decimal/i);
    fireEvent.change(decimalInput, { target: { value: "" } });

    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toHaveValue("");
    });
  });
});
