import React, { useState } from "react";
import CalculationContainer from "./container";

const StringCaseConverter = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const getWords = (text: string) => {
    return text
      .trim()
      .split(/[^a-zA-Z0-9]+/)
      .filter((word) => word.length > 0);
  };

  const toCamelCase = (text: string) => {
    const words = getWords(text);
    if (words.length === 0) return "";
    return words
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join("");
  };

  const toSnakeCase = (text: string) => {
    const words = getWords(text);
    return words.map((word) => word.toLowerCase()).join("_");
  };

  const toKebabCase = (text: string) => {
    const words = getWords(text);
    return words.map((word) => word.toLowerCase()).join("-");
  };

  const toPascalCase = (text: string) => {
    const words = getWords(text);
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: "16px" }}>
        String Case Converter
      </h4>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
        <label style={{ width: "100%" }}>
          Text to Convert
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text (e.g. hello world)..."
            style={{ width: "100%", minHeight: "80px", marginBottom: 0 }}
          />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <label>
            camelCase
            <input type="text" value={toCamelCase(inputText)} readOnly />
          </label>
          <label>
            snake_case
            <input type="text" value={toSnakeCase(inputText)} readOnly />
          </label>
          <label>
            kebab-case
            <input type="text" value={toKebabCase(inputText)} readOnly />
          </label>
          <label>
            PascalCase
            <input type="text" value={toPascalCase(inputText)} readOnly />
          </label>
        </div>
      </div>
    </CalculationContainer>
  );
};

export default StringCaseConverter;
