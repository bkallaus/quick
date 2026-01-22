import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import CalculationContainer from "./container";

const QrCode = () => {
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const download = () => {
    if (!canvasRef.current) return;

    // Find the canvas element inside the wrapper
    const canvas = canvasRef.current.querySelector("canvas");
    if (!canvas) return;

    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL("image/png");
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
          Content
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Enter text to generate QR code"
          />
        </label>
        {text && (
          <div ref={canvasRef}>
            <QRCodeCanvas value={text} size={256} level="H" />
          </div>
        )}
        <button onClick={download} disabled={!text}>
          Download PNG
        </button>
      </div>
    </CalculationContainer>
  );
};

export default QrCode;
