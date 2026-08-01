import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JwtDecoder from "./jwt-decoder";
import '@testing-library/jest-dom';

describe("JwtDecoder", () => {
  it("renders correctly", () => {
    render(<JwtDecoder />);
    expect(screen.getByRole("heading", { name: "JWT Decoder" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Paste your JWT here")).toBeInTheDocument();
  });

  it("shows error for invalid format", async () => {
    const user = userEvent.setup();
    render(<JwtDecoder />);
    const input = screen.getByPlaceholderText("Paste your JWT here");
    await user.type(input, "invalid.token");
    expect(screen.getByText("Invalid JWT format. Must contain 3 parts.")).toBeInTheDocument();
  });

  it("decodes valid token correctly", async () => {
    const user = userEvent.setup();
    render(<JwtDecoder />);

    // A sample token. Header: {"alg":"HS256","typ":"JWT"}, Payload: {"sub":"1234567890","name":"John Doe","iat":1516239022}
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    const input = screen.getByPlaceholderText("Paste your JWT here");
    await user.type(input, token);

    // wait for decode
    const headerElement = await screen.findByDisplayValue(/HS256/);
    expect(headerElement).toBeInTheDocument();

    const payloadElement = await screen.findByDisplayValue(/John Doe/);
    expect(payloadElement).toBeInTheDocument();
  });

  it("detects expired token correctly", async () => {
    const user = userEvent.setup();
    render(<JwtDecoder />);

    // Payload with exp in the past: {"exp": 1516239022}
    // Base64 encoded payload: eyJleHAiOiAxNTE2MjM5MDIyfQ==
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiAxNTE2MjM5MDIyfQ.signature";

    const input = screen.getByPlaceholderText("Paste your JWT here");
    await user.type(input, token);

    expect(await screen.findByText("Token is EXPIRED")).toBeInTheDocument();
  });

  it("detects unexpired token correctly", async () => {
    const user = userEvent.setup();
    render(<JwtDecoder />);

    // Payload with exp far in the future
    const futureExp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const payload = btoa(JSON.stringify({ exp: futureExp }));

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.signature`;

    const input = screen.getByPlaceholderText("Paste your JWT here");
    await user.type(input, token);

    expect(await screen.findByText("Token is VALID (not expired)")).toBeInTheDocument();
  });
});
