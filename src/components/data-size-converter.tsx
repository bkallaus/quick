import { useState, ChangeEvent } from "react";
import Container from "./container";

const UNITS = ["Bytes", "KB", "MB", "GB", "TB"];

export default function DataSizeConverter() {
  const [bytes, setBytes] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value === "") {
      setBytes("");
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    const bytesValue = numValue * Math.pow(1024, index);
    setBytes(bytesValue.toString());
  };

  const getDisplayValue = (index: number): string => {
    if (bytes === "") return "";
    const numBytes = parseFloat(bytes);
    if (isNaN(numBytes)) return "";

    const value = numBytes / Math.pow(1024, index);

    // Check if the value is essentially an integer
    if (Math.abs(Math.round(value) - value) < 1e-10) {
      return Math.round(value).toString();
    }

    // Otherwise, limit to 4 decimal places and remove trailing zeros
    let strValue = value.toFixed(4);
    while (strValue.includes('.') && (strValue.endsWith('0') || strValue.endsWith('.'))) {
      strValue = strValue.slice(0, -1);
    }
    return strValue;
  };

  return (
    <Container>
      <div style={{ width: "100%" }}>
        <h2 style={{ marginBottom: 16 }}>Data Size</h2>
        <div className="grid">
          {UNITS.map((unit, index) => (
          <div key={unit}>
            <label htmlFor={`input-${unit.toLowerCase()}`}>{unit}</label>
            <input
              type="number"
              id={`input-${unit.toLowerCase()}`}
              value={getDisplayValue(index)}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="0"
            />
          </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
