import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TemperatureConverter from "./temperature-converter";

describe("TemperatureConverter", () => {
  it("renders correctly with default values", () => {
    render(<TemperatureConverter />);

    expect(screen.getByLabelText("Celsius (°C)")).toHaveValue(0);
    expect(screen.getByLabelText("Fahrenheit (°F)")).toHaveValue(32);
    expect(screen.getByLabelText("Kelvin (K)")).toHaveValue(273.15);
  });

  it("updates Fahrenheit and Kelvin when Celsius is changed", () => {
    render(<TemperatureConverter />);

    const celsiusInput = screen.getByLabelText("Celsius (°C)");
    fireEvent.change(celsiusInput, { target: { value: "100" } });

    expect(screen.getByLabelText("Fahrenheit (°F)")).toHaveValue(212);
    expect(screen.getByLabelText("Kelvin (K)")).toHaveValue(373.15);
  });

  it("updates Celsius and Kelvin when Fahrenheit is changed", () => {
    render(<TemperatureConverter />);

    const fahrenheitInput = screen.getByLabelText("Fahrenheit (°F)");
    fireEvent.change(fahrenheitInput, { target: { value: "212" } });

    expect(screen.getByLabelText("Celsius (°C)")).toHaveValue(100);
    expect(screen.getByLabelText("Kelvin (K)")).toHaveValue(373.15);
  });

  it("updates Celsius and Fahrenheit when Kelvin is changed", () => {
    render(<TemperatureConverter />);

    const kelvinInput = screen.getByLabelText("Kelvin (K)");
    fireEvent.change(kelvinInput, { target: { value: "373.15" } });

    expect(screen.getByLabelText("Celsius (°C)")).toHaveValue(100);
    expect(screen.getByLabelText("Fahrenheit (°F)")).toHaveValue(212);
  });
});
