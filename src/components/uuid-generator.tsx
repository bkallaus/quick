import React, { useState, useEffect } from "react";
import CalculationContainer from "./container";

const UuidGenerator = () => {
  const [uuid, setUuid] = useState("");

  const generateUuid = () => {
    // Basic UUID v4 implementation using Math.random for compatibility
    // since jest jsdom doesn't support crypto.getRandomValues natively
    const newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    setUuid(newUuid);
  };

  useEffect(() => {
    generateUuid();
  }, []);

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>UUID v4 Generator</h4>
      <div style={{ width: "100%", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
        <label style={{ flex: 1, minWidth: "250px" }}>
          UUID
          <input
            type="text"
            readOnly
            value={uuid}
            style={{ width: "100%", marginBottom: 0 }}
          />
        </label>
        <button
          onClick={generateUuid}
          style={{ marginBottom: 0, whiteSpace: "nowrap" }}
        >
          Generate New
        </button>
      </div>
    </CalculationContainer>
  );
};

export default UuidGenerator;
