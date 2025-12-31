import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import CalculationContainer from "./container";

const MlToCups = () => {
  const [mililitersOfWater, setMiliLitersOfWater] = useState(236.6);
  const [cups, setCups] = useState(1);

  const updateMililiters = (miliLiters: number) => {
    setMiliLitersOfWater(miliLiters);
    setCups(Math.round(miliLiters / 236.588));
  };

  const updateCups = (grams: number) => {
    setCups(grams);
    setMiliLitersOfWater(Math.round(grams * 236.588));
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Cups to mL</h4>

      <label>
        MiliLiters
        <NumericFormat
          value={mililitersOfWater}
          thousandSeparator=","
          allowNegative={false}
          onValueChange={(e: { value: any }) => updateMililiters(Number(e.value))}
        />
      </label>
      <label>
        Cups
        <NumericFormat
          value={cups}
          allowNegative={false}
          thousandSeparator=","
          onValueChange={(e) => updateCups(Number(e.value))}
        />
      </label>
    </CalculationContainer>
  );
};

export default MlToCups;
