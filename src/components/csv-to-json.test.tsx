import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CsvToJson from "./csv-to-json";

describe("CsvToJson", () => {
  it("renders correctly", () => {
    render(<CsvToJson />);
    expect(screen.getByText("CSV to JSON Converter")).toBeInTheDocument();
    expect(screen.getByLabelText("CSV Input")).toBeInTheDocument();
    expect(screen.getByLabelText("JSON Output")).toBeInTheDocument();
  });

  it("converts basic CSV to JSON array", async () => {
    render(<CsvToJson />);

    const input = screen.getByLabelText("CSV Input");
    await userEvent.type(input, "id,name\n1,Alice\n2,Bob");

    const output = screen.getByLabelText("JSON Output");

    // Using string matching to avoid exact space formatting issues in parsing
    expect(output).toHaveValue(JSON.stringify([
      { id: "1", name: "Alice" },
      { id: "2", name: "Bob" }
    ], null, 2));
  });

  it("handles empty input", async () => {
    render(<CsvToJson />);

    const input = screen.getByLabelText("CSV Input");
    const output = screen.getByLabelText("JSON Output");

    await userEvent.type(input, "id,name");
    await userEvent.clear(input);

    expect(output).toHaveValue("");
  });
});
