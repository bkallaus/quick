import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UrlEncoder from "./url-encoder";

describe("UrlEncoder Component", () => {
  it("renders correctly", () => {
    render(<UrlEncoder />);
    expect(screen.getByText("URL Encoder/Decoder")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter plain text...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter URL encoded text...")).toBeInTheDocument();
  });

  it("encodes plain text correctly", () => {
    render(<UrlEncoder />);
    const plainTextArea = screen.getByPlaceholderText("Enter plain text...");
    const urlEncodedTextArea = screen.getByPlaceholderText("Enter URL encoded text...");

    fireEvent.change(plainTextArea, { target: { value: "Hello World!" } });

    expect(urlEncodedTextArea).toHaveValue("Hello%20World!");
  });

  it("decodes URL encoded text correctly", () => {
    render(<UrlEncoder />);
    const plainTextArea = screen.getByPlaceholderText("Enter plain text...");
    const urlEncodedTextArea = screen.getByPlaceholderText("Enter URL encoded text...");

    fireEvent.change(urlEncodedTextArea, { target: { value: "Hello%20World!" } });

    expect(plainTextArea).toHaveValue("Hello World!");
  });

  it("displays an error for invalid URL encoded text", () => {
    render(<UrlEncoder />);
    const urlEncodedTextArea = screen.getByPlaceholderText("Enter URL encoded text...");

    // An invalid URL encoded sequence
    fireEvent.change(urlEncodedTextArea, { target: { value: "%E0%A4%A" } });

    expect(screen.getByRole("alert")).toHaveTextContent("Unable to decode: invalid URL encoding.");
  });

  it("clears error when valid input is provided", () => {
    render(<UrlEncoder />);
    const urlEncodedTextArea = screen.getByPlaceholderText("Enter URL encoded text...");

    // Trigger error
    fireEvent.change(urlEncodedTextArea, { target: { value: "%E0%A4%A" } });
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Provide valid input to clear error
    fireEvent.change(urlEncodedTextArea, { target: { value: "Hello" } });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
