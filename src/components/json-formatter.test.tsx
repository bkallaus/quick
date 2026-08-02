import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import JsonFormatter from "./json-formatter";

describe("JsonFormatter Component", () => {
  it("renders the component correctly", () => {
    render(<JsonFormatter />);
    expect(screen.getByRole("heading", { name: "JSON Formatter" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Paste JSON here...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Formatted output will appear here...")).toBeInTheDocument();
  });

  it("formats valid JSON correctly", () => {
    render(<JsonFormatter />);
    const rawInput = screen.getByPlaceholderText("Paste JSON here...");
    const formattedOutput = screen.getByPlaceholderText("Formatted output will appear here...");

    const validJson = '{"key":"value","number":123}';
    const expectedFormatted = JSON.stringify({ key: "value", number: 123 }, null, 2);

    fireEvent.change(rawInput, { target: { value: validJson } });

    expect(formattedOutput).toHaveValue(expectedFormatted);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("displays an error for invalid JSON", () => {
    render(<JsonFormatter />);
    const rawInput = screen.getByPlaceholderText("Paste JSON here...");

    const invalidJson = '{"key":"value"'; // Missing closing brace

    fireEvent.change(rawInput, { target: { value: invalidJson } });

    expect(screen.getByRole("alert")).toHaveTextContent("Invalid JSON");
  });

  it("clears error and output when input is cleared", () => {
    render(<JsonFormatter />);
    const rawInput = screen.getByPlaceholderText("Paste JSON here...");
    const formattedOutput = screen.getByPlaceholderText("Formatted output will appear here...");

    // Enter invalid JSON
    fireEvent.change(rawInput, { target: { value: '{"key"' } });
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Clear input
    fireEvent.change(rawInput, { target: { value: "" } });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(formattedOutput).toHaveValue("");
  });
});
