import React, { useState, useEffect } from "react";
import CalculationContainer from "./container";

const UuidGenerator = () => {
  const [uuid, setUuid] = useState("");
  const [copied, setCopied] = useState(false);

  const generateUuid = () => {
    let newUuid = "";
    try {
      newUuid = crypto.randomUUID();
    } catch (e) {
      newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    setUuid(newUuid);
    setCopied(false);
  };

  useEffect(() => {
    generateUuid();
  }, []);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(uuid).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>UUID Generator</h4>
      <div style={{ width: "100%", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
        <label style={{ flex: 1, minWidth: "250px", marginBottom: 0 }}>
          UUID
          <input
            type="text"
            readOnly
            value={uuid}
            style={{ marginBottom: 0 }}
          />
        </label>
        <div style={{ display: "flex", gap: "8px", marginBottom: 0 }}>
          <button onClick={handleCopy} style={{ marginBottom: 0, minWidth: "120px" }}>
            {copied ? "Copied!" : "Copy"}
          </button>
          <button onClick={generateUuid} className="secondary" style={{ marginBottom: 0, minWidth: "120px" }}>
            Generate
          </button>
        </div>
      </div>
    </CalculationContainer>
  );
};

export default UuidGenerator;
