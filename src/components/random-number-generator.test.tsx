import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import RandomNumberGenerator from "./random-number-generator";

describe("RandomNumberGenerator", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    // Mock Math.random to make tests deterministic
    vi.spyOn(Math, 'random').mockReturnValue(0.5); // For min=1, max=100, this should give 51
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders with default min and max", () => {
    render(<RandomNumberGenerator />);
    expect(screen.getByLabelText("Min")).toHaveValue(1);
    expect(screen.getByLabelText("Max")).toHaveValue(100);
  });

  it("generates a random number", () => {
    render(<RandomNumberGenerator />);

    const generateBtn = screen.getByRole("button", { name: /generate/i });
    fireEvent.click(generateBtn);

    // With Math.random() mocked to 0.5:
    // Math.floor(0.5 * (100 - 1 + 1)) + 1 = Math.floor(0.5 * 100) + 1 = 51
    const resultInput = screen.getByLabelText("Result");
    expect(resultInput).toHaveValue("51");
  });

  it("shows an error when min is greater than max", () => {
    render(<RandomNumberGenerator />);

    const minInput = screen.getByLabelText("Min");
    const maxInput = screen.getByLabelText("Max");
    const generateBtn = screen.getByRole("button", { name: /generate/i });

    fireEvent.change(minInput, { target: { value: "100" } });
    fireEvent.change(maxInput, { target: { value: "10" } });
    fireEvent.click(generateBtn);

    expect(screen.getByText("Min value cannot be greater than Max value")).toBeInTheDocument();
  });

  it("copies result to clipboard", () => {
    render(<RandomNumberGenerator />);

    const generateBtn = screen.getByRole("button", { name: /generate/i });
    fireEvent.click(generateBtn);

    const copyBtn = screen.getByRole("button", { name: /copy to clipboard/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("51");
    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });
});
