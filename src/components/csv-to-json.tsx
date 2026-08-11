import React, { useState, useEffect } from "react";
import Container from "./container";

const CsvToJson: React.FC = () => {
  const [csvInput, setCsvInput] = useState<string>("");
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!csvInput.trim()) {
      setJsonOutput("");
      setError(null);
      return;
    }

    try {
      const lines = csvInput.split(/\r?\n/).filter(line => line.trim() !== "");
      if (lines.length < 2) {
        setJsonOutput("[]");
        setError(null);
        return;
      }

      const headers = lines[0].split(",").map(h => h.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const obj: { [key: string]: string } = {};
        const currentLine = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j] ? currentLine[j].trim() : "";
        }
        result.push(obj);
      }

      setJsonOutput(JSON.stringify(result, null, 2));
      setError(null);
    } catch (err: any) {
      setError("Failed to parse CSV. Ensure it is formatted correctly.");
      setJsonOutput("");
    }
  }, [csvInput]);

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>CSV to JSON Converter</h2>
        <div>
          <label htmlFor="csv-input">CSV Input</label>
          <textarea
            id="csv-input"
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder={"id,name,age\n1,Alice,30\n2,Bob,25"}
            style={{ width: "100%", height: "150px", fontFamily: "monospace", resize: "vertical" }}
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <label htmlFor="json-output">JSON Output</label>
          <textarea
            id="json-output"
            value={jsonOutput}
            readOnly
            placeholder="[]"
            style={{ width: "100%", height: "200px", fontFamily: "monospace", resize: "vertical" }}
          />
        </div>
      </div>
    </Container>
  );
};

export default CsvToJson;
