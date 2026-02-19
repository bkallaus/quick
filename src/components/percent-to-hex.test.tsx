import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import PercentToHex from "./percent-to-hex";

// Mock clipboard
const mockClipboardWriteText = jest.fn();
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: mockClipboardWriteText,
  },
  writable: true,
});

describe("PercentToHex", () => {
  beforeEach(() => {
    mockClipboardWriteText.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders correctly", () => {
    render(<PercentToHex />);
    expect(screen.getByText("Percent to Hex")).toBeInTheDocument();
    expect(screen.getByLabelText("Percent")).toBeInTheDocument();
    expect(screen.getByLabelText("Hex")).toBeInTheDocument();
    expect(screen.getByLabelText("Base 10")).toBeInTheDocument();
  });

  it("updates hex and base10 when percent changes", () => {
    render(<PercentToHex />);
    const percentInput = screen.getByLabelText("Percent");

    fireEvent.change(percentInput, { target: { value: "50" } });

    // 50% of 255 is roughly 128 (rounded), which is 80 in hex
    expect(screen.getByLabelText("Base 10")).toHaveValue(128);
    expect(screen.getByLabelText("Hex")).toHaveValue("80");
  });

  it("updates percent and base10 when hex changes", () => {
    render(<PercentToHex />);
    const hexInput = screen.getByLabelText("Hex");

    fireEvent.change(hexInput, { target: { value: "FF" } });

    expect(screen.getByLabelText("Base 10")).toHaveValue(255);
    expect(screen.getByLabelText("Percent")).toHaveValue("100%");
  });

  it("updates percent and hex when base10 changes", () => {
    render(<PercentToHex />);
    const base10Input = screen.getByLabelText("Base 10");

    // Test with 255
    fireEvent.change(base10Input, { target: { value: "255" } });

    // Bug fixed: 255 (base10) -> FF (hex)
    expect(screen.getByLabelText("Hex")).toHaveValue("FF");
    expect(screen.getByLabelText("Percent")).toHaveValue("100%");
  });

  // This test will fail initially because the button doesn't exist yet
  it("copies hex value to clipboard when copy button is clicked", async () => {
    render(<PercentToHex />);
    const hexInput = screen.getByLabelText("Hex");

    // Set a value first
    fireEvent.change(hexInput, { target: { value: "AA" } });

    // Find the copy button
    const copyButton = screen.getByText("Copy");

    fireEvent.click(copyButton);
    expect(mockClipboardWriteText).toHaveBeenCalledWith("AA");

    // Check for feedback
    expect(screen.getByText("Copied!")).toBeInTheDocument();

    // Fast-forward time
    act(() => {
        jest.advanceTimersByTime(2000);
    });

    expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });
});
