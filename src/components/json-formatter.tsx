import React, { useState } from "react";
import CalculationContainer from "./container";

const JsonFormatter = () => {
  const [rawJson, setRawJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRawJson(value);

    if (value.trim() === "") {
      setFormattedJson("");
      setError("");
      return;
    }

    try {
      const parsed = JSON.parse(value);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (err) {
      setError("Invalid JSON");
      setFormattedJson("");
    }
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>JSON Formatter</h4>
      <div style={{ width: "100%", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <label style={{ flex: 1, minWidth: "250px" }}>
          Raw JSON
          <textarea
            value={rawJson}
            onChange={handleChange}
            placeholder="Paste JSON here..."
            style={{ width: "100%", minHeight: "200px", marginBottom: 0, fontFamily: "monospace" }}
          />
        </label>
        <label style={{ flex: 1, minWidth: "250px" }}>
          Formatted JSON
          <textarea
            value={formattedJson}
            readOnly
            placeholder="Formatted output will appear here..."
            style={{ width: "100%", minHeight: "200px", marginBottom: 0, fontFamily: "monospace" }}
          />
        </label>
      </div>
      {error && <div style={{ width: "100%", color: "red", textAlign: "center", marginTop: "8px" }} role="alert">{error}</div>}
    </CalculationContainer>
  );
};

export default JsonFormatter;
