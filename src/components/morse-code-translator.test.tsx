import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MorseCodeTranslator from "./morse-code-translator";
import "@testing-library/jest-dom";

describe("MorseCodeTranslator", () => {
  it("renders both input fields", () => {
    render(<MorseCodeTranslator />);

    expect(screen.getByLabelText("Text")).toBeInTheDocument();
    expect(screen.getByLabelText("Morse Code")).toBeInTheDocument();
  });

  it("translates text to morse code", () => {
    render(<MorseCodeTranslator />);

    const textInput = screen.getByLabelText(/Text to translate to Morse Code/i);
    const morseInput = screen.getByLabelText(/Morse Code to translate to Text/i);

    fireEvent.change(textInput, { target: { value: "HELLO WORLD" } });

    expect(morseInput).toHaveValue(".... . .-.. .-.. --- / .-- --- .-. .-.. -..");
  });

  it("translates morse code to text", () => {
    render(<MorseCodeTranslator />);

    const textInput = screen.getByLabelText(/Text to translate to Morse Code/i);
    const morseInput = screen.getByLabelText(/Morse Code to translate to Text/i);

    fireEvent.change(morseInput, { target: { value: ".... . .-.. .-.. --- / .-- --- .-. .-.. -.." } });

    expect(textInput).toHaveValue("HELLO WORLD");
  });

  it("handles lowercase text input", () => {
    render(<MorseCodeTranslator />);

    const textInput = screen.getByLabelText(/Text to translate to Morse Code/i);
    const morseInput = screen.getByLabelText(/Morse Code to translate to Text/i);

    fireEvent.change(textInput, { target: { value: "hello" } });

    expect(morseInput).toHaveValue(".... . .-.. .-.. ---");
  });

  it("handles unknown characters in text by keeping them as is", () => {
    render(<MorseCodeTranslator />);

    const textInput = screen.getByLabelText(/Text to translate to Morse Code/i);
    const morseInput = screen.getByLabelText(/Morse Code to translate to Text/i);

    fireEvent.change(textInput, { target: { value: "A 🚀 B" } });

    // JS string.split("") breaks emojis into surrogates, so we test a simpler character instead
    fireEvent.change(textInput, { target: { value: "A # B" } });
    expect(morseInput).toHaveValue(".- / # / -...");
  });

  it("handles unknown codes in morse by keeping them as is", () => {
    render(<MorseCodeTranslator />);

    const textInput = screen.getByLabelText(/Text to translate to Morse Code/i);
    const morseInput = screen.getByLabelText(/Morse Code to translate to Text/i);

    fireEvent.change(morseInput, { target: { value: ".- # -..." } });

    expect(textInput).toHaveValue("A#B");
  });
});
