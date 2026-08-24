import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SlugGenerator from "./slug-generator";
import "@testing-library/jest-dom";

describe("SlugGenerator", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it("renders the component correctly", () => {
    render(<SlugGenerator />);
    expect(screen.getByText("Slug Generator")).toBeInTheDocument();
    expect(screen.getByLabelText("Text to Slugify")).toBeInTheDocument();
    expect(screen.getByLabelText("Generated Slug")).toBeInTheDocument();
  });

  it("generates a simple slug", () => {
    render(<SlugGenerator />);
    const input = screen.getByLabelText("Text to Slugify");
    const output = screen.getByLabelText("Generated Slug") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Hello World" } });
    expect(output.value).toBe("hello-world");
  });

  it("handles special characters and multiple spaces", () => {
    render(<SlugGenerator />);
    const input = screen.getByLabelText("Text to Slugify");
    const output = screen.getByLabelText("Generated Slug") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "This is a TEST! With @special #chars &   spaces" } });
    expect(output.value).toBe("this-is-a-test-with-special-chars-spaces");
  });

  it("handles leading and trailing spaces/hyphens", () => {
    render(<SlugGenerator />);
    const input = screen.getByLabelText("Text to Slugify");
    const output = screen.getByLabelText("Generated Slug") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "   --Hello World--   " } });
    expect(output.value).toBe("hello-world");
  });

  it("copies to clipboard", async () => {
    render(<SlugGenerator />);
    const input = screen.getByLabelText("Text to Slugify");
    fireEvent.change(input, { target: { value: "Copy Me" } });

    const copyBtn = screen.getByRole("button", { name: "Copy slug" });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("copy-me");
    await waitFor(() => {
        expect(screen.getByRole("button", { name: "Copy slug" })).toBeInTheDocument();
    })
  });
});
