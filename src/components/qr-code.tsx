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
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>QR Code</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ width: "100%", display: "flex", gap: "16px", alignItems: "flex-end" }}>
          <label style={{ flex: 1 }}>
            Content
            <input
              type="text"
              value={text}
              onChange={handleChange}
              placeholder="Enter text to generate QR code"
              style={{ marginBottom: 0 }}
            />
          </label>
          <button onClick={download} disabled={!text} style={{ width: "auto", marginBottom: 0 }}>
            Download PNG
          </button>
        </div>
        {text && (
          <div ref={canvasRef}>
            <QRCodeCanvas value={text} size={256} level="H" />
          </div>
        )}
      </div>
    </CalculationContainer>
  );
};

export default QrCode;
