import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HslColorPicker from "./hsl-color-picker";

describe("HslColorPicker", () => {
  test("renders correctly with default values", () => {
    render(<HslColorPicker />);

    expect(screen.getByText("HSL Color Picker")).toBeInTheDocument();

    const preview = screen.getByTestId("color-preview");
    expect(preview).toHaveStyle({ backgroundColor: "hsl(0, 100%, 50%)" });

    expect(screen.getByText("CSS Value:")).toBeInTheDocument();
    expect(screen.getByText("hsl(0, 100%, 50%)")).toBeInTheDocument();
  });

  test("updates color when hue changes", () => {
    render(<HslColorPicker />);

    const hueInput = screen.getByLabelText(/Hue/i);
    fireEvent.change(hueInput, { target: { value: "180" } });

    const preview = screen.getByTestId("color-preview");
    expect(preview).toHaveStyle({ backgroundColor: "hsl(180, 100%, 50%)" });

    expect(screen.getByText("hsl(180, 100%, 50%)")).toBeInTheDocument();
  });

  test("updates color when saturation changes", () => {
    render(<HslColorPicker />);

    const satInput = screen.getByLabelText(/Saturation/i);
    fireEvent.change(satInput, { target: { value: "50" } });

    const preview = screen.getByTestId("color-preview");
    expect(preview).toHaveStyle({ backgroundColor: "hsl(0, 50%, 50%)" });

    expect(screen.getByText("hsl(0, 50%, 50%)")).toBeInTheDocument();
  });

  test("updates color when lightness changes", () => {
    render(<HslColorPicker />);

    const lightInput = screen.getByLabelText(/Lightness/i);
    fireEvent.change(lightInput, { target: { value: "25" } });

    const preview = screen.getByTestId("color-preview");
    expect(preview).toHaveStyle({ backgroundColor: "hsl(0, 100%, 25%)" });

    expect(screen.getByText("hsl(0, 100%, 25%)")).toBeInTheDocument();
  });
});
