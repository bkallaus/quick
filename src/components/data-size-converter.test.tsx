import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import DataSizeConverter from "./data-size-converter";

describe("DataSizeConverter", () => {
  it("renders all input fields", () => {
    render(<DataSizeConverter />);

    expect(screen.getByLabelText("Bytes")).toBeInTheDocument();
    expect(screen.getByLabelText("KB")).toBeInTheDocument();
    expect(screen.getByLabelText("MB")).toBeInTheDocument();
    expect(screen.getByLabelText("GB")).toBeInTheDocument();
    expect(screen.getByLabelText("TB")).toBeInTheDocument();
  });

  it("updates other fields when Bytes is input", () => {
    render(<DataSizeConverter />);

    const bytesInput = screen.getByLabelText("Bytes");
    fireEvent.change(bytesInput, { target: { value: "1024" } });

    expect(screen.getByLabelText("KB")).toHaveValue(1);
    expect(screen.getByLabelText("MB")).toHaveValue(0.001);
  });

  it("updates other fields when KB is input", () => {
    render(<DataSizeConverter />);

    const kbInput = screen.getByLabelText("KB");
    fireEvent.change(kbInput, { target: { value: "1" } });

    expect(screen.getByLabelText("Bytes")).toHaveValue(1024);
    expect(screen.getByLabelText("MB")).toHaveValue(0.001);
  });

  it("clears all fields when input is cleared", () => {
    render(<DataSizeConverter />);

    const kbInput = screen.getByLabelText("KB");
    fireEvent.change(kbInput, { target: { value: "1" } });
    expect(screen.getByLabelText("Bytes")).toHaveValue(1024);

    fireEvent.change(kbInput, { target: { value: "" } });

    expect(screen.getByLabelText("Bytes")).toHaveValue(null);
    expect(screen.getByLabelText("KB")).toHaveValue(null);
    expect(screen.getByLabelText("MB")).toHaveValue(null);
  });

  it("handles decimal inputs correctly", () => {
    render(<DataSizeConverter />);

    const mbInput = screen.getByLabelText("MB");
    fireEvent.change(mbInput, { target: { value: "1.5" } });

    expect(screen.getByLabelText("KB")).toHaveValue(1536);
  });
});
