import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import CalculationContainer from "./container";

const PourOver = () => {
  const [mililitersOfWater, setMiliLitersOfWater] = useState(500);
  const [gramsOfGrounds, setGramsOfGrounds] = useState(30);

  const setWaterThenGrams = (miliLiters: number) => {
    setMiliLitersOfWater(miliLiters);
    setGramsOfGrounds(Math.round(0.06 * miliLiters));
  };

  const setGramsthenWater = (grams: number) => {
    setGramsOfGrounds(grams);
    setMiliLitersOfWater(Math.round(grams / 0.06));
  };

  return (
    <CalculationContainer>
      <Typography>Pour Over</Typography>
      <NumericFormat
        label="Water (mL)"
        style={{ width: 120 }}
        value={mililitersOfWater}
        customInput={TextField}
        thousandSeparator=","
        onValueChange={(e: { value: any }) =>
          setWaterThenGrams(Number(e.value))
        }
      />
      <NumericFormat
        label="Grounds (g)"
        style={{ width: 120 }}
        value={gramsOfGrounds}
        customInput={TextField}
        thousandSeparator=","
        onValueChange={(e) => setGramsthenWater(Number(e.value))}
      />
    </CalculationContainer>
  );
};

export default PourOver;
