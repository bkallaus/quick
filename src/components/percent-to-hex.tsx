import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import { PatternFormat } from "react-number-format";

const PercentToHex = () => {
  const [baseTenValue, setBaseTenValue] = React.useState(0);
  const [hexValue, setHexValue] = React.useState("");
  const [percentValue, setPercentValue] = React.useState(0);

  const onPercentChange = (percent: number) => {
    const base10 = Math.round((percent * 255) / 100);
    setPercentValue(percent);
    setBaseTenValue(base10);

    let hex = "";
    if (base10 < 16) {
      hex = "0" + base10.toString(16).toUpperCase();
    } else {
      hex = base10.toString(16).toUpperCase();
    }

    console.log({
      base10,
      hex,
      percent,
    });
    setHexValue(hex);
  };

  const onBaseTenChange = (base10: number) => {
    const percent = Math.round((base10 / 255) * 100);
    setPercentValue(percent);
    setBaseTenValue(base10);

    let hex = "";
    if (base10 < 16) {
      hex = "0" + percent.toString(16).toUpperCase();
    } else {
      hex = percent.toString(16).toUpperCase();
    }

    setHexValue(hex);
  };

  const onHexChange = (hex: string) => {
    const base10 = Number.parseInt(hex, 16);
    setPercentValue((base10 / 255) * 100);
    setBaseTenValue(base10);
    setHexValue(hex);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Typography>Percent to Hex</Typography>
      <PatternFormat
        style={{ width: 120 }}
        value={percentValue}
        format={"###%"}
        customInput={TextField}
        type="text"
        onValueChange={({ value }: { value: string }) =>
          onPercentChange(Number(value))
        }
      />
      <Typography>-</Typography>
      <TextField
        sx={{
          width: 120,
        }}
        onChange={(e) => onHexChange(e.target.value)}
        value={hexValue}
        label="Hex"
      />
      <Typography>-</Typography>
      <TextField
        sx={{
          width: 120,
        }}
        type="number"
        onChange={(e) => onBaseTenChange(Number(e.target.value))}
        value={baseTenValue}
        label="Base 10"
      />
    </Box>
  );
};

export default PercentToHex;
