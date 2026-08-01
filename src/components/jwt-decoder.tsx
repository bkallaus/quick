import CalculationContainer from "./container";
import React, { useState, useEffect } from "react";

const JwtDecoder = () => {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [isExpired, setIsExpired] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jwt.trim()) {
      setHeader("");
      setPayload("");
      setIsExpired(null);
      setError("");
      return;
    }

    const parts = jwt.split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT format. Must contain 3 parts.");
      setHeader("");
      setPayload("");
      setIsExpired(null);
      return;
    }

    try {
      const decodedHeader = atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"));
      const decodedPayload = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));

      const parsedHeader = JSON.parse(decodedHeader);
      const parsedPayload = JSON.parse(decodedPayload);

      setHeader(JSON.stringify(parsedHeader, null, 2));
      setPayload(JSON.stringify(parsedPayload, null, 2));
      setError("");

      if (parsedPayload.exp) {
        const expTime = parsedPayload.exp * 1000;
        setIsExpired(Date.now() > expTime);
      } else {
        setIsExpired(null);
      }
    } catch (e) {
      setError("Failed to decode JWT. It might be malformed.");
      setHeader("");
      setPayload("");
      setIsExpired(null);
    }
  }, [jwt]);

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>JWT Decoder</h4>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
        <label>
          JSON Web Token
          <textarea
            value={jwt}
            onChange={(e) => setJwt(e.target.value)}
            placeholder="Paste your JWT here"
            style={{ width: "100%", height: "100px", fontFamily: "monospace", resize: "vertical" }}
          />
        </label>

        {error && <div style={{ color: "var(--pico-del-color)" }}>{error}</div>}

        {header && (
          <label>
            Header
            <textarea
              readOnly
              value={header}
              style={{ width: "100%", height: "120px", fontFamily: "monospace", margin: 0, resize: "vertical" }}
            />
          </label>
        )}

        {payload && (
          <label>
            Payload
            <textarea
              readOnly
              value={payload}
              style={{ width: "100%", height: "200px", fontFamily: "monospace", margin: 0, resize: "vertical" }}
            />
          </label>
        )}

        {isExpired !== null && (
          <div style={{
            padding: "8px",
            borderRadius: "4px",
            backgroundColor: isExpired ? "rgba(220, 53, 69, 0.1)" : "rgba(40, 167, 69, 0.1)",
            color: isExpired ? "var(--pico-del-color)" : "var(--pico-ins-color)",
            fontWeight: "bold",
            textAlign: "center"
          }}>
            {isExpired ? "Token is EXPIRED" : "Token is VALID (not expired)"}
          </div>
        )}
      </div>
    </CalculationContainer>
  );
};

export default JwtDecoder;
