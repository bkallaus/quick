import React, { useState } from "react";
import CalculationContainer from "./container";

const HslColorPicker = () => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);

  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>
        HSL Color Picker
      </h4>
      <div
        data-testid="color-preview"
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: color,
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        <label>
          Hue: {hue}
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
          />
        </label>
        <label>
          Saturation: {saturation}%
          <input
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
          />
        </label>
        <label>
          Lightness: {lightness}%
          <input
            type="range"
            min="0"
            max="100"
            value={lightness}
            onChange={(e) => setLightness(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <strong>CSS Value:</strong> <code>{color}</code>
      </div>
    </CalculationContainer>
  );
};

export default HslColorPicker;
