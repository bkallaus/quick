import React, { useState } from "react";
import CalculationContainer from "./container";

const WeightConverter = () => {
  const [kg, setKg] = useState<number | "">("");
  const [g, setG] = useState<number | "">("");
  const [lb, setLb] = useState<number | "">("");
  const [oz, setOz] = useState<number | "">("");

  const updateValues = (kgValue: number) => {
    setKg(Number(kgValue.toFixed(4)));
    setG(Number((kgValue * 1000).toFixed(4)));
    setLb(Number((kgValue * 2.20462).toFixed(4)));
    setOz(Number((kgValue * 35.274).toFixed(4)));
  };

  const clearValues = () => {
    setKg("");
    setG("");
    setLb("");
    setOz("");
  };

  const handleKgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") return clearValues();
    updateValues(Number(value));
  };

  const handleGChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") return clearValues();
    updateValues(Number(value) / 1000);
  };

  const handleLbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") return clearValues();
    updateValues(Number(value) / 2.20462);
  };

  const handleOzChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") return clearValues();
    updateValues(Number(value) / 35.274);
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Weight Converter</h4>
      <div style={{ width: "100%", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
        <label style={{ flex: 1, minWidth: "120px" }}>
          Kilograms (kg)
          <input
            type="number"
            value={kg}
            onChange={handleKgChange}
            placeholder="0"
          />
        </label>
        <label style={{ flex: 1, minWidth: "120px" }}>
          Grams (g)
          <input
            type="number"
            value={g}
            onChange={handleGChange}
            placeholder="0"
          />
        </label>
        <label style={{ flex: 1, minWidth: "120px" }}>
          Pounds (lb)
          <input
            type="number"
            value={lb}
            onChange={handleLbChange}
            placeholder="0"
          />
        </label>
        <label style={{ flex: 1, minWidth: "120px" }}>
          Ounces (oz)
          <input
            type="number"
            value={oz}
            onChange={handleOzChange}
            placeholder="0"
          />
        </label>
      </div>
    </CalculationContainer>
  );
};

export default WeightConverter;
