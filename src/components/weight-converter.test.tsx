import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import WeightConverter from "./weight-converter";

describe("WeightConverter", () => {
  it("renders correctly", () => {
    render(<WeightConverter />);
    expect(screen.getByText("Weight Converter")).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("0", { exact: false }).length).toBe(4);
  });

  it("updates other values when kg is changed", () => {
    render(<WeightConverter />);
    const kgInput = screen.getByLabelText("Kilograms (kg)");
    fireEvent.change(kgInput, { target: { value: "1" } });

    expect(screen.getByLabelText("Grams (g)")).toHaveValue(1000);
    expect(screen.getByLabelText("Pounds (lb)")).toHaveValue(2.2046);
    expect(screen.getByLabelText("Ounces (oz)")).toHaveValue(35.274);
  });

  it("updates other values when lb is changed", () => {
    render(<WeightConverter />);
    const lbInput = screen.getByLabelText("Pounds (lb)");
    fireEvent.change(lbInput, { target: { value: "2.20462" } });

    expect(screen.getByLabelText("Kilograms (kg)")).toHaveValue(1);
    expect(screen.getByLabelText("Grams (g)")).toHaveValue(1000);
  });

  it("clears values when input is empty", () => {
    render(<WeightConverter />);
    const kgInput = screen.getByLabelText("Kilograms (kg)");
    fireEvent.change(kgInput, { target: { value: "1" } });
    fireEvent.change(kgInput, { target: { value: "" } });

    expect(screen.getByLabelText("Grams (g)")).toHaveValue(null);
    expect(screen.getByLabelText("Pounds (lb)")).toHaveValue(null);
  });
});
