import React, { useState } from "react";
import CalculationContainer from "./container";

const NumberBaseConverter = () => {
  const [decimal, setDecimal] = useState("42");
  const [binary, setBinary] = useState("101010");
  const [octal, setOctal] = useState("52");
  const [hexadecimal, setHexadecimal] = useState("2a");

  const updateBases = (val: string, base: number) => {
    // If empty, clear all
    if (!val) {
      setDecimal("");
      setBinary("");
      setOctal("");
      setHexadecimal("");
      return;
    }

    let parsedVal: number;
    if (base === 16) {
      parsedVal = parseInt(val, 16);
    } else if (base === 2) {
      parsedVal = parseInt(val, 2);
    } else if (base === 8) {
      parsedVal = parseInt(val, 8);
    } else {
      parsedVal = parseInt(val, 10);
    }

    if (isNaN(parsedVal)) {
        return; // Don't update if invalid input during typing
    }

    setDecimal(parsedVal.toString(10));
    setBinary(parsedVal.toString(2));
    setOctal(parsedVal.toString(8));
    setHexadecimal(parsedVal.toString(16));
  };

  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setDecimal(val);
    if (val) updateBases(val, 10);
    else updateBases("", 10);
  };

  const handleBinaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-1]/g, '');
    setBinary(val);
    if (val) updateBases(val, 2);
    else updateBases("", 2);
  };

  const handleOctalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-7]/g, '');
    setOctal(val);
    if (val) updateBases(val, 8);
    else updateBases("", 8);
  };

  const handleHexadecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9a-fA-F]/g, '');
    setHexadecimal(val);
    if (val) updateBases(val, 16);
    else updateBases("", 16);
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Number Base Converter</h4>

      <div style={{ width: "100%", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <label style={{ flex: 1, minWidth: "200px" }}>
          Decimal
          <input
            type="text"
            value={decimal}
            onChange={handleDecimalChange}
            placeholder="e.g. 42"
          />
        </label>
        <label style={{ flex: 1, minWidth: "200px" }}>
          Binary
          <input
            type="text"
            value={binary}
            onChange={handleBinaryChange}
            placeholder="e.g. 101010"
          />
        </label>
        <label style={{ flex: 1, minWidth: "200px" }}>
          Octal
          <input
            type="text"
            value={octal}
            onChange={handleOctalChange}
            placeholder="e.g. 52"
          />
        </label>
        <label style={{ flex: 1, minWidth: "200px" }}>
          Hexadecimal
          <input
            type="text"
            value={hexadecimal}
            onChange={handleHexadecimalChange}
            placeholder="e.g. 2a"
          />
        </label>
      </div>
    </CalculationContainer>
  );
};

export default NumberBaseConverter;
