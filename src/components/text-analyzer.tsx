import React, { useState } from "react";
import CalculationContainer from "./container";

const TextAnalyzer = () => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const charCount = text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Text Analyzer</h4>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
        <label>
          Text
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Enter text here..."
            style={{ width: "100%", minHeight: "150px", marginBottom: 0 }}
          />
        </label>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div><strong>Characters:</strong> <span data-testid="char-count">{charCount}</span></div>
          <div><strong>Words:</strong> <span data-testid="word-count">{wordCount}</span></div>
          <div><strong>Lines:</strong> <span data-testid="line-count">{lineCount}</span></div>
        </div>
      </div>
    </CalculationContainer>
  );
};

export default TextAnalyzer;
