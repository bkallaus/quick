import { TextField, Typography } from "@mui/material";
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
      <Typography>Cups to mL</Typography>

      <NumericFormat
        label="MiliLiters"
        style={{ width: 120 }}
        value={mililitersOfWater}
        customInput={TextField}
        thousandSeparator=","
        allowNegative={false}
        onValueChange={(e: { value: any }) => updateMililiters(Number(e.value))}
      />
      <NumericFormat
        label="Cups"
        style={{ width: 120 }}
        value={cups}
        allowNegative={false}
        customInput={TextField}
        thousandSeparator=","
        onValueChange={(e) => updateCups(Number(e.value))}
      />
    </CalculationContainer>
  );
};

export default MlToCups;
