import { Box, Button, TextField, imageListClasses } from "@mui/material";
import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import CalculationContainer from "./container";

const QrCode = () => {
  const [text, setText] = useState("");
  const ref = React.useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const download = () => {
    const svg = document.getElementById("canvas");
    const downloadLink = document.createElement("a");

    // @ts-ignore
    downloadLink.href = svg.toDataURL("image/png");
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <CalculationContainer>
      <Box
        display="flex"
        flexDirection={"column"}
        gap={3}
        alignItems={"center"}
      >
        <TextField
          type="text"
          label="URL"
          value={text}
          onChange={handleChange}
        />
        <QRCodeCanvas id="canvas" value={text} />
        <Button onClick={download}>Download PNG</Button>
      </Box>
    </CalculationContainer>
  );
};

export default QrCode;
