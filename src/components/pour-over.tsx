import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import CalculationContainer from "./container";

const PourOver = () => {
  const [mililitersOfWater, setMiliLitersOfWater] = useState(500);
  const [gramsOfGrounds, setGramsOfGrounds] = useState(31);
  const [ratio, setRatio] = useState(16);

  const setWaterThenGrams = (miliLiters: number) => {
    setMiliLitersOfWater(miliLiters);
    setGramsOfGrounds(Math.round((1 / ratio) * miliLiters));
  };

  const setGramsthenWater = (grams: number) => {
    setGramsOfGrounds(grams);
    setMiliLitersOfWater(Math.round(grams / (1 / ratio)));
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Pour Over/Drip</h4>
      <div style={{ width: "100%", display: "flex", gap: "16px" }}>
        <label style={{ flex: 1 }}>
          Ratio (mL/g)
          <NumericFormat
            value={ratio}
            allowNegative={false}
            thousandSeparator=","
            onValueChange={(e: { value: any }) => setRatio(Number(e.value))}
          />
        </label>
        <label style={{ flex: 1 }}>
          Water (mL)
          <NumericFormat
            value={mililitersOfWater}
            thousandSeparator=","
            allowNegative={false}
            onValueChange={(e: { value: any }) =>
              setWaterThenGrams(Number(e.value))
            }
          />
        </label>
        <label style={{ flex: 1 }}>
          Grounds (g)
          <NumericFormat
            value={gramsOfGrounds}
            allowNegative={false}
            thousandSeparator=","
            onValueChange={(e) => setGramsthenWater(Number(e.value))}
          />
        </label>
      </div>
    </CalculationContainer>
  );
};

export default PourOver;
