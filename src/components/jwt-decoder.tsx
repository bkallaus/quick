import React, { useState } from "react";
import CalculationContainer from "./container";

const JwtDecoder = () => {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState(false);

  const decodeBase64Url = (str: string) => {
    try {
      // Add removed at end '='
      str = str.replace(/-/g, "+").replace(/_/g, "/");
      const pad = str.length % 4;
      if (pad) {
        if (pad === 1) {
          throw new Error("InvalidLengthError: Input base64url string is the wrong length to determine padding");
        }
        str += new Array(5 - pad).join("=");
      }
      return decodeURIComponent(
        atob(str)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } catch (e) {
      throw new Error("Invalid base64 string");
    }
  };

  const handleJwtChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJwt(value);
    setError(false);
    setHeader("");
    setPayload("");

    if (!value.trim()) return;

    const parts = value.split(".");
    if (parts.length !== 3) {
      setError(true);
      return;
    }

    try {
      const decodedHeader = decodeBase64Url(parts[0]);
      const decodedPayload = decodeBase64Url(parts[1]);

      setHeader(JSON.stringify(JSON.parse(decodedHeader), null, 2));
      setPayload(JSON.stringify(JSON.parse(decodedPayload), null, 2));
    } catch (e) {
      setError(true);
    }
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 16 }}>
        JWT Decoder
      </h4>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
        <label>
          JWT String
          <textarea
            value={jwt}
            onChange={handleJwtChange}
            placeholder="Paste your JWT here..."
            style={{ width: "100%", minHeight: "100px", fontFamily: "monospace" }}
          />
        </label>

        {error && (
          <div style={{ color: "red", marginTop: "8px" }}>
            Invalid JWT structure or encoding.
          </div>
        )}

        {!error && header && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <strong>Header:</strong>
              <pre style={{
                background: "var(--pico-background-color)",
                padding: "16px",
                borderRadius: "4px",
                overflowX: "auto"
              }}>
                <code>{header}</code>
              </pre>
            </div>
            <div>
              <strong>Payload:</strong>
              <pre style={{
                background: "var(--pico-background-color)",
                padding: "16px",
                borderRadius: "4px",
                overflowX: "auto"
              }}>
                <code>{payload}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </CalculationContainer>
  );
};

export default JwtDecoder;
