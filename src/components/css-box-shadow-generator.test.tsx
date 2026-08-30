import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CssBoxShadowGenerator from "./css-box-shadow-generator";
import "@testing-library/jest-dom";

describe("CssBoxShadowGenerator", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it("renders with default values", () => {
    render(<CssBoxShadowGenerator />);

    expect(screen.getByText("CSS Box Shadow Generator")).toBeInTheDocument();

    // Check initial CSS string output
    const pre = screen.getByText(/box-shadow: 10px 10px 15px 0px rgba\(0, 0, 0, 0.25\);/);
    expect(pre).toBeInTheDocument();
  });

  it("updates CSS string when color inputs change", () => {
    render(<CssBoxShadowGenerator />);

    const shadowColorInput = screen.getByLabelText("Shadow Color");

    fireEvent.change(shadowColorInput, { target: { value: "#ff0000" } });

    // Since hexToRgba doesn't trigger automatically on fireEvent for color in jsdom without extra logic,
    // the hex-to-rgba converter handles "#ff0000" correctly if it updates state.
    const pre = screen.getByText(/box-shadow: 10px 10px 15px 0px rgba\(255, 0, 0, 0.25\);/);
    expect(pre).toBeInTheDocument();
  });

  it("copies CSS string to clipboard", async () => {
    render(<CssBoxShadowGenerator />);

    const copyButton = screen.getByTitle("Copy to clipboard");
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.25);"
    );
  });
});
