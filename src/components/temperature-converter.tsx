import React, { useState, ChangeEvent } from "react";
import CalculationContainer from "./container";

const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState<string>("0");
  const [fahrenheit, setFahrenheit] = useState<string>("32");
  const [kelvin, setKelvin] = useState<string>("273.15");

  const handleCelsiusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCelsius(value);

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setFahrenheit(((numValue * 9) / 5 + 32).toString());
      setKelvin((numValue + 273.15).toString());
    } else {
      setFahrenheit("");
      setKelvin("");
    }
  };

  const handleFahrenheitChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFahrenheit(value);

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setCelsius((((numValue - 32) * 5) / 9).toString());
      setKelvin((((numValue - 32) * 5) / 9 + 273.15).toString());
    } else {
      setCelsius("");
      setKelvin("");
    }
  };

  const handleKelvinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKelvin(value);

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setCelsius((numValue - 273.15).toString());
      setFahrenheit((((numValue - 273.15) * 9) / 5 + 32).toString());
    } else {
      setCelsius("");
      setFahrenheit("");
    }
  };

  return (
    <div className="component-wrapper">
      <h2>Temperature Converter</h2>
      <CalculationContainer>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-end", width: "100%", flexWrap: "wrap" }}>
          <label style={{ flex: 1, minWidth: "120px" }}>
            Celsius (°C)
            <input
              type="number"
              value={celsius}
              onChange={handleCelsiusChange}
              placeholder="0"
            />
          </label>
          <label style={{ flex: 1, minWidth: "120px" }}>
            Fahrenheit (°F)
            <input
              type="number"
              value={fahrenheit}
              onChange={handleFahrenheitChange}
              placeholder="32"
            />
          </label>
          <label style={{ flex: 1, minWidth: "120px" }}>
            Kelvin (K)
            <input
              type="number"
              value={kelvin}
              onChange={handleKelvinChange}
              placeholder="273.15"
            />
          </label>
        </div>
      </CalculationContainer>
    </div>
  );
};

export default TemperatureConverter;
