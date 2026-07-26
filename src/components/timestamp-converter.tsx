import React, { useState } from "react";
import CalculationContainer from "./container";

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState<string>("");
  const [localTime, setLocalTime] = useState<string>("");
  const [utcTime, setUtcTime] = useState<string>("");

  const updateTimes = (tsStr: string) => {
    setTimestamp(tsStr);

    if (!tsStr.trim()) {
      setLocalTime("");
      setUtcTime("");
      return;
    }

    const tsNum = Number(tsStr);
    if (isNaN(tsNum)) {
      setLocalTime("Invalid timestamp");
      setUtcTime("Invalid timestamp");
      return;
    }

    // Auto-detect seconds vs milliseconds.
    // If the value is less than 10000000000 (Nov 20 2286), assume seconds
    let ms = tsNum;
    if (tsNum < 10000000000) {
      ms = tsNum * 1000;
    }

    const date = new Date(ms);

    if (isNaN(date.getTime())) {
      setLocalTime("Invalid date");
      setUtcTime("Invalid date");
      return;
    }

    setLocalTime(date.toString());
    setUtcTime(date.toUTCString());
  };

  const handleNowClick = () => {
    updateTimes(Date.now().toString());
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>
        Timestamp Converter
      </h4>
      <div style={{ width: "100%", display: "flex", gap: "16px", alignItems: "flex-end" }}>
        <label style={{ flex: 1 }}>
          Unix Timestamp (ms or s)
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => updateTimes(e.target.value)}
              placeholder="e.g. 1672531200"
              style={{ flex: 1 }}
            />
            <button onClick={handleNowClick} style={{ padding: "8px 16px" }}>Now</button>
          </div>
        </label>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
        <label>
          Local Time
          <input type="text" readOnly value={localTime} style={{ backgroundColor: "#f5f5f5" }} />
        </label>
        <label>
          UTC Time
          <input type="text" readOnly value={utcTime} style={{ backgroundColor: "#f5f5f5" }} />
        </label>
      </div>
    </CalculationContainer>
  );
};

export default TimestampConverter;
