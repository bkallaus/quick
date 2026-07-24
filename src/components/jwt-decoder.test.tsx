import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import JwtDecoder from "./jwt-decoder";

describe("JwtDecoder", () => {
  it("renders correctly", () => {
    render(<JwtDecoder />);
    expect(screen.getByText("JWT Decoder")).toBeInTheDocument();
    expect(screen.getByLabelText("JWT String")).toBeInTheDocument();
  });

  it("handles valid JWT input", () => {
    render(<JwtDecoder />);

    // A valid JWT: header={"alg":"HS256"}, payload={"sub":"123","name":"John"}
    // signature is arbitrary for decoding
    const validJwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiSm9obiJ9.signature";

    const input = screen.getByLabelText("JWT String");
    fireEvent.change(input, { target: { value: validJwt } });

    // Header and payload should be rendered as stringified JSON or similar
    expect(screen.getByText(/"alg":\s*"HS256"/)).toBeInTheDocument();
    expect(screen.getByText(/"sub":\s*"123"/)).toBeInTheDocument();
    expect(screen.getByText(/"name":\s*"John"/)).toBeInTheDocument();

    // Error message should not be visible
    expect(screen.queryByText(/Invalid JWT/)).not.toBeInTheDocument();
  });

  it("handles invalid JWT input", () => {
    render(<JwtDecoder />);

    const invalidJwt = "invalid.token.string";

    const input = screen.getByLabelText("JWT String");
    fireEvent.change(input, { target: { value: invalidJwt } });

    expect(screen.getByText(/Invalid JWT/)).toBeInTheDocument();
  });

  it("handles empty input", () => {
    render(<JwtDecoder />);

    const input = screen.getByLabelText("JWT String");
    fireEvent.change(input, { target: { value: "" } });

    expect(screen.queryByText(/Invalid JWT/)).not.toBeInTheDocument();
  });
});
