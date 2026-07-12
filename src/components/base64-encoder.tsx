import React, { useState } from "react";
import CalculationContainer from "./container";

const Base64Encoder = () => {
  const [plainText, setPlainText] = useState("");
  const [base64Text, setBase64Text] = useState("");
  const [error, setError] = useState("");

  const handlePlainChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPlainText(value);
    setError("");
    try {
      setBase64Text(btoa(value));
    } catch (err) {
      setError("Unable to encode: input contains invalid characters.");
    }
  };

  const handleBase64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBase64Text(value);
    setError("");
    try {
      setPlainText(atob(value));
    } catch (err) {
      setError("Unable to decode: invalid Base64 string.");
    }
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Base64 Encoder/Decoder</h4>
      <div style={{ width: "100%", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <label style={{ flex: 1, minWidth: "250px" }}>
          Plain Text
          <textarea
            value={plainText}
            onChange={handlePlainChange}
            placeholder="Enter plain text..."
            style={{ width: "100%", minHeight: "120px", marginBottom: 0 }}
          />
        </label>
        <label style={{ flex: 1, minWidth: "250px" }}>
          Base64
          <textarea
            value={base64Text}
            onChange={handleBase64Change}
            placeholder="Enter base64..."
            style={{ width: "100%", minHeight: "120px", marginBottom: 0 }}
          />
        </label>
      </div>
      {error && <div style={{ width: "100%", color: "red", textAlign: "center", marginTop: "8px" }} role="alert">{error}</div>}
    </CalculationContainer>
  );
};

export default Base64Encoder;
