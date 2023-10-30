import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";

const QrCode = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const generateQRCode = () => {
    const qrcode = new QRCode({
      value: text,
      size: 200,
    });
  };

  return (
    <Box>
      <TextField type="text" value={text} onChange={handleChange} />
      <Button onClick={generateQRCode}>Generate QR Code</Button>
      <QRCode value={text} />
      {/* <img src={generateQRCode()} /> */}
      {/* <Button>Download</Button> */}
    </Box>
  );
};

export default QrCode;
