import { TextField, Typography } from "@mui/material";
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
      <Typography>Pour Over/Drip</Typography>
      <NumericFormat
        label="Ratio (mL/g)"
        style={{ width: 120 }}
        value={ratio}
        allowNegative={false}
        customInput={TextField}
        thousandSeparator=","
        onValueChange={(e: { value: any }) => setRatio(Number(e.value))}
      />
      <NumericFormat
        label="Water (mL)"
        style={{ width: 120 }}
        value={mililitersOfWater}
        customInput={TextField}
        thousandSeparator=","
        allowNegative={false}
        onValueChange={(e: { value: any }) =>
          setWaterThenGrams(Number(e.value))
        }
      />
      <NumericFormat
        label="Grounds (g)"
        style={{ width: 120 }}
        value={gramsOfGrounds}
        allowNegative={false}
        customInput={TextField}
        thousandSeparator=","
        onValueChange={(e) => setGramsthenWater(Number(e.value))}
      />
    </CalculationContainer>
  );
};

export default PourOver;
