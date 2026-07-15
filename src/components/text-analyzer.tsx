import React, { useState } from "react";
import CalculationContainer from "./container";

const TextAnalyzer = () => {
  const [text, setText] = useState("");

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Text Analyzer</h4>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
        <label>
          Text Input
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Type or paste text here..."
            style={{ width: "100%", resize: "vertical" }}
          />
        </label>

        <div style={{ display: "flex", gap: "16px", justifyContent: "space-around" }}>
          <div style={{ textAlign: "center" }}>
            <strong>Words:</strong> {wordCount}
          </div>
          <div style={{ textAlign: "center" }}>
            <strong>Characters:</strong> {charCount}
          </div>
        </div>
      </div>
    </CalculationContainer>
  );
};

export default TextAnalyzer;
