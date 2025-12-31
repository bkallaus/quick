import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import CalculationContainer from "./container";

const QrCode = () => {
  const [text, setText] = useState("");
  // const ref = React.useRef(); // Unused

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const download = () => {
    const svg = document.getElementById("canvas") as HTMLCanvasElement;
    const downloadLink = document.createElement("a");

    downloadLink.href = svg.toDataURL("image/png");
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <CalculationContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "center",
        }}
      >
        <label>
          URL
          <input
            type="text"
            value={text}
            onChange={handleChange}
          />
        </label>
        <QRCodeCanvas id="canvas" value={text} />
        <button onClick={download}>Download PNG</button>
      </div>
    </CalculationContainer>
  );
};

export default QrCode;
