import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MetaTagsGenerator from "./meta-tags-generator";

describe("MetaTagsGenerator", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it("renders the component with inputs and empty output", () => {
    render(<MetaTagsGenerator />);
    expect(screen.getByText("Meta Tags Generator")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Image URL")).toBeInTheDocument();
    expect(screen.getByLabelText("Generated Meta Tags")).toHaveValue("");
  });

  it("generates correct tags based on inputs", () => {
    render(<MetaTagsGenerator />);

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "My Awesome Page" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "This is a great page." },
    });
    fireEvent.change(screen.getByLabelText("Image URL"), {
      target: { value: "https://example.com/image.jpg" },
    });

    const output = screen.getByLabelText("Generated Meta Tags") as HTMLTextAreaElement;
    expect(output.value).toContain("<title>My Awesome Page</title>");
    expect(output.value).toContain('<meta name="description" content="This is a great page." />');
    expect(output.value).toContain('<meta property="og:title" content="My Awesome Page" />');
    expect(output.value).toContain('<meta property="og:image" content="https://example.com/image.jpg" />');
    expect(output.value).toContain('<meta property="twitter:description" content="This is a great page." />');
  });

  it("copies generated tags to clipboard", async () => {
    render(<MetaTagsGenerator />);

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Title" },
    });

    const copyButton = screen.getByRole("button", { name: "Copy to clipboard" });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining("<title>Test Title</title>")
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Copy to clipboard" })).toHaveTextContent("Copied!");
    });
  });
});
