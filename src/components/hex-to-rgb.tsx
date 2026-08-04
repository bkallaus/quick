import CalculationContainer from "./container";
import React from "react";

const HexToRgb = () => {
  const [hex, setHex] = React.useState("");
  const [rgb, setRgb] = React.useState("");
  const [color, setColor] = React.useState("transparent");

  const hexToRgb = (hexStr: string) => {
    const validHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexStr);
    if (validHex) {
      return `${parseInt(validHex[1], 16)}, ${parseInt(validHex[2], 16)}, ${parseInt(validHex[3], 16)}`;
    }

    const validShortHex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hexStr);
    if (validShortHex) {
      return `${parseInt(validShortHex[1]+validShortHex[1], 16)}, ${parseInt(validShortHex[2]+validShortHex[2], 16)}, ${parseInt(validShortHex[3]+validShortHex[3], 16)}`;
    }
    return null;
  };

  const rgbToHex = (rgbStr: string) => {
    const match = rgbStr.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
      }
    }
    return null;
  };

  const onHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHex(value);
    const convertedRgb = hexToRgb(value);
    if (convertedRgb) {
      setRgb(convertedRgb);
      setColor(`rgb(${convertedRgb})`);
    } else {
      setColor("transparent");
    }
  };

  const onRgbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRgb(value);
    const convertedHex = rgbToHex(value);
    if (convertedHex) {
      setHex(convertedHex);
      setColor(`rgb(${value})`);
    } else {
      setColor("transparent");
    }
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Hex to RGB</h4>
      <div style={{ width: "100%", display: "flex", gap: "16px", alignItems: "flex-end" }}>
        <label style={{ flex: 1 }}>
          Hex
          <input
            type="text"
            placeholder="#FFFFFF"
            value={hex}
            onChange={onHexChange}
          />
        </label>
        <label style={{ flex: 1 }}>
          RGB
          <input
            type="text"
            placeholder="255, 255, 255"
            value={rgb}
            onChange={onRgbChange}
          />
        </label>
        <div data-testid="color-preview" style={{ width: "50px", height: "50px", borderRadius: "var(--pico-border-radius)", border: "var(--pico-border-width) solid var(--pico-form-element-border-color)", backgroundColor: color, marginBottom: "var(--pico-spacing)" }} title="Color Preview" />
      </div>
    </CalculationContainer>
  );
};

export default HexToRgb;
