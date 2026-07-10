import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TipCalculator from "./tip-calculator";

describe("TipCalculator", () => {
  it("renders correctly with default values", () => {
    render(<TipCalculator />);
    expect(screen.getByText("Tip Calculator")).toBeInTheDocument();

    // Check initial tip percentage (15%) and number of people (1)
    const inputs = screen.getAllByRole("textbox");
    // Bill amount should be empty initially
    expect(inputs[0]).toHaveValue("");
    // Tip percentage should be 15
    expect(inputs[1]).toHaveValue("15%");
    // Number of people should be 1
    expect(inputs[2]).toHaveValue("1");

    expect(screen.getByText("Tip Amount")).toBeInTheDocument();
    expect(screen.getByText("Total Amount")).toBeInTheDocument();
  });

  it("calculates tip and total correctly", async () => {
    render(<TipCalculator />);
    const user = userEvent.setup();

    // Select bill amount input
    const inputs = screen.getAllByRole("textbox");
    const billInput = inputs[0];

    // Enter $100
    await user.type(billInput, "100");

    // With 15% default tip, tip amount should be $15.00 and total $115.00
    expect(screen.getByText("$15.00")).toBeInTheDocument();
    expect(screen.getByText("$115.00")).toBeInTheDocument();
  });

  it("calculates per person amounts when number of people > 1", async () => {
    render(<TipCalculator />);
    const user = userEvent.setup();

    const inputs = screen.getAllByRole("textbox");
    const billInput = inputs[0];
    const peopleInput = inputs[2];

    // Enter $100 bill
    await user.type(billInput, "100");

    // Change people to 2
    await user.clear(peopleInput);
    await user.type(peopleInput, "2");

    // Per person texts should appear
    expect(screen.getByText((content, element) => {
      return element?.textContent === "$7.50 / person";
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.textContent === "$57.50 / person";
    })).toBeInTheDocument();
  });

  it("updates calculation when tip percentage changes", async () => {
    render(<TipCalculator />);
    const user = userEvent.setup();

    const inputs = screen.getAllByRole("textbox");
    const billInput = inputs[0];
    const tipInput = inputs[1];

    // Enter $100 bill
    await user.type(billInput, "100");

    // Change tip to 20%
    // React-number-format is a bit tricky with clear/type, so we select and type
    await user.clear(tipInput);
    await user.type(tipInput, "20");

    expect(screen.getByText("$20.00")).toBeInTheDocument();
    expect(screen.getByText("$120.00")).toBeInTheDocument();
  });
});
