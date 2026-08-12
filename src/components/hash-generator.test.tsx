import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HashGenerator from "./hash-generator";
import "@testing-library/jest-dom";

// Mock crypto.subtle.digest for test environment since JSDOM might not have full support
beforeAll(() => {
  if (typeof crypto.subtle === "undefined") {
    // @ts-ignore
    crypto.subtle = {
      digest: jest.fn().mockImplementation((algo: string, data: Uint8Array) => {
        // Return a dummy buffer based on algo and input size for testing purposes
        return Promise.resolve(new ArrayBuffer(data.length));
      }),
    };
  }
});

describe("HashGenerator", () => {
  it("renders correctly with empty inputs", () => {
    render(<HashGenerator />);
    expect(screen.getByText("Hash Generator")).toBeInTheDocument();
    expect(screen.getByLabelText("Input Text")).toHaveValue("");

    // Check all hash inputs are empty initially
    expect(screen.getByPlaceholderText("SHA-1 hash will appear here")).toHaveValue("");
    expect(screen.getByPlaceholderText("SHA-256 hash will appear here")).toHaveValue("");
    expect(screen.getByPlaceholderText("SHA-384 hash will appear here")).toHaveValue("");
    expect(screen.getByPlaceholderText("SHA-512 hash will appear here")).toHaveValue("");
  });

  it("updates hashes when typing text", async () => {
    render(<HashGenerator />);
    const user = userEvent.setup();
    const input = screen.getByLabelText("Input Text");

    await user.type(input, "hello");

    // Wait for the async calculation to finish and update the UI
    await waitFor(() => {
      // With our mock, the dummy hash might just be "00" * data.length (5 for "hello")
      // We mainly want to check that it isn't empty anymore (or it's what our mock returns).
      const sha256Input = screen.getByPlaceholderText("SHA-256 hash will appear here");
      expect(sha256Input).not.toHaveValue("");
    });
  });

  it("clears hashes when input is cleared", async () => {
    render(<HashGenerator />);
    const user = userEvent.setup();
    const input = screen.getByLabelText("Input Text");

    await user.type(input, "hello");
    await waitFor(() => {
      expect(screen.getByPlaceholderText("SHA-256 hash will appear here")).not.toHaveValue("");
    });

    await user.clear(input);

    // Web Crypto API in jsdom might act up with an empty array.
    // Our component explicitly checks `if (!inputText)` and returns empty strings.
    await waitFor(() => {
      expect(screen.getByPlaceholderText("SHA-256 hash will appear here")).toHaveValue("");
    });
  });
});
