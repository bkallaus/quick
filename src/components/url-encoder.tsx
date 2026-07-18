import React, { useState } from "react";
import CalculationContainer from "./container";

const UrlEncoder = () => {
  const [plainText, setPlainText] = useState("");
  const [urlEncodedText, setUrlEncodedText] = useState("");
  const [error, setError] = useState("");

  const handlePlainChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPlainText(value);
    setError("");
    try {
      setUrlEncodedText(encodeURIComponent(value));
    } catch (err) {
      setError("Unable to encode.");
    }
  };

  const handleUrlEncodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUrlEncodedText(value);
    setError("");
    try {
      setPlainText(decodeURIComponent(value));
    } catch (err) {
      setError("Unable to decode: invalid URL encoding.");
    }
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>URL Encoder/Decoder</h4>
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
          URL Encoded
          <textarea
            value={urlEncodedText}
            onChange={handleUrlEncodedChange}
            placeholder="Enter URL encoded text..."
            style={{ width: "100%", minHeight: "120px", marginBottom: 0 }}
          />
        </label>
      </div>
      {error && <div style={{ width: "100%", color: "red", textAlign: "center", marginTop: "8px" }} role="alert">{error}</div>}
    </CalculationContainer>
  );
};

export default UrlEncoder;
