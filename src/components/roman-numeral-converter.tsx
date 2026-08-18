import React, { useState } from "react";
import CalculationContainer from "./container";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const ROMAN_NUMERALS = [
  { value: 1000, numeral: "M" },
  { value: 900, numeral: "CM" },
  { value: 500, numeral: "D" },
  { value: 400, numeral: "CD" },
  { value: 100, numeral: "C" },
  { value: 90, numeral: "XC" },
  { value: 50, numeral: "L" },
  { value: 40, numeral: "XL" },
  { value: 10, numeral: "X" },
  { value: 9, numeral: "IX" },
  { value: 5, numeral: "V" },
  { value: 4, numeral: "IV" },
  { value: 1, numeral: "I" }
];

function toRoman(num: number): string {
  if (num < 1 || num > 3999 || isNaN(num)) return "";
  let result = "";
  for (const { value, numeral } of ROMAN_NUMERALS) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

function fromRoman(roman: string): number | null {
  if (!roman) return null;
  const upperRoman = roman.toUpperCase();
  // Valid characters only check
  if (!/^[MDCLXVI]+$/.test(upperRoman)) return null;

  let result = 0;
  for (let i = 0; i < upperRoman.length; i++) {
    const currentVal = ROMAN_NUMERALS.find(r => r.numeral === upperRoman[i])?.value || 0;
    const nextVal = ROMAN_NUMERALS.find(r => r.numeral === upperRoman[i + 1])?.value || 0;

    if (currentVal < nextVal) {
      result -= currentVal;
    } else {
      result += currentVal;
    }
  }

  // To check for valid structure, convert back to roman and compare
  if (toRoman(result) !== upperRoman) return null;

  return result;
}

const RomanNumeralConverter = () => {
  const [number, setNumber] = useState("");
  const [roman, setRoman] = useState("");
  const [error, setError] = useState("");

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNumber(val);
    setError("");

    if (!val) {
      setRoman("");
      return;
    }

    const num = parseInt(val, 10);
    if (isNaN(num)) {
      setError("Please enter a valid integer.");
      setRoman("");
    } else if (num < 1 || num > 3999) {
      setError("Number must be between 1 and 3999.");
      setRoman("");
    } else {
      setRoman(toRoman(num));
    }
  };

  const handleRomanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setRoman(val);
    setError("");

    if (!val) {
      setNumber("");
      return;
    }

    const num = fromRoman(val);
    if (num === null) {
      setError("Invalid Roman Numeral.");
      setNumber("");
    } else {
      setNumber(num.toString());
    }
  };

  return (
    <CalculationContainer>
      <h4 className="w-full text-center mb-0 text-xl font-semibold">Roman Numeral Converter</h4>
      <div className="w-full flex gap-4 flex-wrap mt-4">
        <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
          <Label htmlFor="arabic-number">Number (1-3999)</Label>
          <Input
            id="arabic-number"
            type="number"
            value={number}
            onChange={handleNumberChange}
            placeholder="e.g. 2024"
            className="w-full"
            min="1"
            max="3999"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
          <Label htmlFor="roman-numeral">Roman Numeral</Label>
          <Input
            id="roman-numeral"
            type="text"
            value={roman}
            onChange={handleRomanChange}
            placeholder="e.g. MMXXIV"
            className="w-full uppercase"
          />
        </div>
      </div>
      {error && <div className="w-full text-destructive text-center mt-2 text-sm" role="alert">{error}</div>}
    </CalculationContainer>
  );
};

export default RomanNumeralConverter;
