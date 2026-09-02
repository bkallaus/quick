import React, { useState, useEffect } from "react";
import CalculationContainer from "./container";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

// Morse code dictionary mapping English characters to Morse code
const MORSE_CODE_DICT: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
};

// Reverse dictionary for translating Morse code back to English
const REVERSE_MORSE_CODE_DICT: Record<string, string> = Object.entries(
  MORSE_CODE_DICT
).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

const MorseCodeTranslator = () => {
  const [text, setText] = useState("");
  const [morseCode, setMorseCode] = useState("");
  const [isTypingText, setIsTypingText] = useState(true);

  // Translate Text to Morse Code
  const translateToMorse = (input: string) => {
    return input
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char === " ") return "/"; // Use slash for word separation
        return MORSE_CODE_DICT[char] || char; // Keep unknown characters as is
      })
      .join(" ");
  };

  // Translate Morse Code to Text
  const translateToText = (input: string) => {
    return input
      .split(" ")
      .map((code) => {
        if (code === "/" || code === "") return " "; // Space between words
        return REVERSE_MORSE_CODE_DICT[code] || code; // Keep unknown codes as is
      })
      .join("");
  };

  // Handle changes in the Text input
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setIsTypingText(true);
  };

  // Handle changes in the Morse Code input
  const handleMorseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMorse = e.target.value;
    setMorseCode(newMorse);
    setIsTypingText(false);
  };

  // Effect to sync translations
  useEffect(() => {
    if (isTypingText) {
      setMorseCode(translateToMorse(text));
    } else {
      setText(translateToText(morseCode));
    }
  }, [text, morseCode, isTypingText]);

  return (
    <CalculationContainer>
      <div className="w-full flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Morse Code Translator</h2>

        <div className="flex flex-col gap-6 md:flex-row w-full">
          {/* Text Input */}
          <div className="flex flex-col flex-1 gap-2">
            <Label htmlFor="text-input" className="text-lg font-semibold">
              Text
            </Label>
            <Textarea
              id="text-input"
              placeholder="Enter text to translate..."
              value={text}
              onChange={handleTextChange}
              className="min-h-[200px] resize-y p-4 text-base"
              aria-label="Text to translate to Morse Code"
            />
          </div>

          {/* Morse Code Input */}
          <div className="flex flex-col flex-1 gap-2">
            <Label htmlFor="morse-input" className="text-lg font-semibold">
              Morse Code
            </Label>
            <Textarea
              id="morse-input"
              placeholder="Enter morse code to translate (use / for spaces)..."
              value={morseCode}
              onChange={handleMorseChange}
              className="min-h-[200px] resize-y p-4 text-base font-mono"
              aria-label="Morse Code to translate to Text"
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Separate letters with spaces and words with forward slashes (/).
        </p>
      </div>
    </CalculationContainer>
  );
};

export default MorseCodeTranslator;
