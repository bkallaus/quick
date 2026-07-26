import React, { useState, ChangeEvent } from "react";
import CalculationContainer from "./container";

const PxToRem = () => {
  const [baseSize, setBaseSize] = useState<string>("16");
  const [pxValue, setPxValue] = useState<string>("16");
  const [remValue, setRemValue] = useState<string>("1");

  const handleBaseSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newBase = e.target.value;
    setBaseSize(newBase);

    // Attempt to keep px constant and update rem if possible
    const numBase = parseFloat(newBase);
    const numPx = parseFloat(pxValue);

    if (!isNaN(numBase) && numBase > 0 && !isNaN(numPx)) {
      setRemValue((numPx / numBase).toString());
    }
  };

  const handlePxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPx = e.target.value;
    setPxValue(newPx);

    const numPx = parseFloat(newPx);
    const numBase = parseFloat(baseSize);

    if (!isNaN(numPx) && !isNaN(numBase) && numBase > 0) {
      setRemValue((numPx / numBase).toString());
    } else {
      setRemValue("");
    }
  };

  const handleRemChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newRem = e.target.value;
    setRemValue(newRem);

    const numRem = parseFloat(newRem);
    const numBase = parseFloat(baseSize);

    if (!isNaN(numRem) && !isNaN(numBase) && numBase > 0) {
      setPxValue((numRem * numBase).toString());
    } else {
      setPxValue("");
    }
  };

  return (
    <div className="component-wrapper">
      <h2>Px to Rem Converter</h2>
      <CalculationContainer>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-end", width: "100%", flexWrap: "wrap" }}>
          <label style={{ flex: 1, minWidth: "100px" }}>
            Base Size (px)
            <input
              type="number"
              value={baseSize}
              onChange={handleBaseSizeChange}
              placeholder="16"
            />
          </label>
          <label style={{ flex: 1, minWidth: "120px" }}>
            Pixels (px)
            <input
              type="number"
              value={pxValue}
              onChange={handlePxChange}
              placeholder="16"
            />
          </label>
          <label style={{ flex: 1, minWidth: "120px" }}>
            Rem (rem)
            <input
              type="number"
              value={remValue}
              onChange={handleRemChange}
              placeholder="1"
            />
          </label>
        </div>
      </CalculationContainer>
    </div>
  );
};

export default PxToRem;
