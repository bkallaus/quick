import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UuidGenerator from "./uuid-generator";
import "@testing-library/jest-dom";

describe("UuidGenerator", () => {
  it("renders with an initial UUID", () => {
    render(<UuidGenerator />);

    expect(screen.getByText("UUID v4 Generator")).toBeInTheDocument();

    const input = screen.getByLabelText("UUID") as HTMLInputElement;
    expect(input).toBeInTheDocument();

    // Check if the initial value matches a basic UUID v4 format
    expect(input.value).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it("generates a new UUID when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<UuidGenerator />);

    const input = screen.getByLabelText("UUID") as HTMLInputElement;
    const initialUuid = input.value;

    const button = screen.getByRole("button", { name: "Generate New" });
    await user.click(button);

    const newUuid = input.value;
    expect(newUuid).not.toBe(initialUuid);
    expect(newUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});
