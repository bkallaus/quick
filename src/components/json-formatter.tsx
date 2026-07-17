import React, { useState } from "react";
import CalculationContainer from "./container";

const JsonFormatter = () => {
  const [inputJson, setInputJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputJson(value);
    setError("");

    if (!value.trim()) {
      setFormattedJson("");
      return;
    }

    try {
      const parsed = JSON.parse(value);
      setFormattedJson(JSON.stringify(parsed, null, 2));
    } catch (err) {
      setError("Invalid JSON");
      setFormattedJson("");
    }
  };

  const handleFormattedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Making it read-only or allowing edit? Let's just make it read-only for now or allow copy.
    // If they edit the formatted JSON, we could sync it back, but standard formatters just format.
    setFormattedJson(e.target.value);
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>JSON Formatter</h4>
      <div style={{ width: "100%", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <label style={{ flex: 1, minWidth: "250px" }}>
          Input JSON
          <textarea
            value={inputJson}
            onChange={handleInputChange}
            placeholder="Enter JSON here..."
            style={{ width: "100%", minHeight: "200px", marginBottom: 0, fontFamily: "monospace" }}
          />
        </label>
        <label style={{ flex: 1, minWidth: "250px" }}>
          Formatted JSON
          <textarea
            value={formattedJson}
            onChange={handleFormattedChange}
            readOnly
            placeholder="Formatted JSON will appear here..."
            style={{ width: "100%", minHeight: "200px", marginBottom: 0, fontFamily: "monospace" }}
          />
        </label>
      </div>
      {error && <div style={{ width: "100%", color: "red", textAlign: "center", marginTop: "8px" }} role="alert">{error}</div>}
    </CalculationContainer>
  );
};

export default JsonFormatter;
