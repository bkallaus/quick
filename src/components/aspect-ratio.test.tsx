import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import AspectRatio from "./aspect-ratio";

describe("AspectRatio Calculator", () => {
  it("calculates new height when new width changes", () => {
    render(<AspectRatio />);

    const originalWidthInput = screen.getByLabelText("Width", { selector: "fieldset:nth-of-type(1) input" });
    const originalHeightInput = screen.getByLabelText("Height", { selector: "fieldset:nth-of-type(1) input" });
    const newWidthInput = screen.getByLabelText("Width", { selector: "fieldset:nth-of-type(2) input" });
    const newHeightInput = screen.getByLabelText("Height", { selector: "fieldset:nth-of-type(2) input" });

    fireEvent.change(originalWidthInput, { target: { value: "1920" } });
    fireEvent.change(originalHeightInput, { target: { value: "1080" } });

    fireEvent.change(newWidthInput, { target: { value: "1280" } });

    expect((newHeightInput as HTMLInputElement).value).toBe("720");
  });

  it("calculates new width when new height changes", () => {
    render(<AspectRatio />);

    const originalWidthInput = screen.getByLabelText("Width", { selector: "fieldset:nth-of-type(1) input" });
    const originalHeightInput = screen.getByLabelText("Height", { selector: "fieldset:nth-of-type(1) input" });
    const newWidthInput = screen.getByLabelText("Width", { selector: "fieldset:nth-of-type(2) input" });
    const newHeightInput = screen.getByLabelText("Height", { selector: "fieldset:nth-of-type(2) input" });

    fireEvent.change(originalWidthInput, { target: { value: "16" } });
    fireEvent.change(originalHeightInput, { target: { value: "9" } });

    fireEvent.change(newHeightInput, { target: { value: "720" } });

    expect((newWidthInput as HTMLInputElement).value).toBe("1280");
  });

  it("recalculates new values when original dimensions change", () => {
    render(<AspectRatio />);

    const originalWidthInput = screen.getByLabelText("Width", { selector: "fieldset:nth-of-type(1) input" });
    const originalHeightInput = screen.getByLabelText("Height", { selector: "fieldset:nth-of-type(1) input" });
    const newWidthInput = screen.getByLabelText("Width", { selector: "fieldset:nth-of-type(2) input" });
    const newHeightInput = screen.getByLabelText("Height", { selector: "fieldset:nth-of-type(2) input" });

    // Set initial state: 16:9, New Width: 1280 (calc New Height: 720)
    fireEvent.change(originalWidthInput, { target: { value: "16" } });
    fireEvent.change(originalHeightInput, { target: { value: "9" } });
    fireEvent.change(newWidthInput, { target: { value: "1280" } });

    expect((newHeightInput as HTMLInputElement).value).toBe("720");

    // Change original to 4:3 (New Width is still 1280, so New Height should become 960)
    fireEvent.change(originalWidthInput, { target: { value: "4" } });
    fireEvent.change(originalHeightInput, { target: { value: "3" } });

    expect((newHeightInput as HTMLInputElement).value).toBe("960");
  });
});
