import CalculationContainer from "./container";
import { PatternFormat } from "react-number-format";
import React from "react";

const PercentToHex = () => {
  const [baseTenValue, setBaseTenValue] = React.useState(0);
  const [hexValue, setHexValue] = React.useState("");
  const [percentValue, setPercentValue] = React.useState(0);

  const onPercentChange = (percent: number) => {
    const base10 = Math.round((percent * 255) / 100);
    setPercentValue(percent);
    setBaseTenValue(base10);

    let hex = "";
    if (base10 < 16) {
      hex = "0" + base10.toString(16).toUpperCase();
    } else {
      hex = base10.toString(16).toUpperCase();
    }

    setHexValue(hex);
  };

  const onBaseTenChange = (base10: number) => {
    const percent = Math.round((base10 / 255) * 100);
    setPercentValue(percent);
    setBaseTenValue(base10);

    let hex = "";
    if (base10 < 16) {
      hex = "0" + percent.toString(16).toUpperCase();
    } else {
      hex = percent.toString(16).toUpperCase();
    }

    setHexValue(hex);
  };

  const onHexChange = (hex: string) => {
    const base10 = Number.parseInt(hex, 16);
    setPercentValue((base10 / 255) * 100);
    setBaseTenValue(base10);
    setHexValue(hex);
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Percent to Hex</h4>
      <div style={{ width: "100%", display: "flex", gap: "16px" }}>
        <label style={{ flex: 1 }}>
          Percent
          <PatternFormat
            value={percentValue}
            format={"###%"}
            type="text"
            onValueChange={({ value }: { value: string }) =>
              onPercentChange(Number(value))
            }
          />
        </label>
        <label style={{ flex: 1 }}>
          Hex
          <input
            onChange={(e) => onHexChange(e.target.value)}
            value={hexValue}
          />
        </label>
        <label style={{ flex: 1 }}>
          Base 10
          <input
            type="number"
            onChange={(e) => onBaseTenChange(Number(e.target.value))}
            value={baseTenValue}
          />
        </label>
      </div>
    </CalculationContainer>
  );
};

export default PercentToHex;
