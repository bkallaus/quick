import React, { useState } from "react";
import CalculationContainer from "./container";

const IframeTester = () => {
  const [url, setUrl] = useState("");
  const [src, setSrc] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleLoad = () => {
    setSrc(url);
  };

  return (
    <CalculationContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
          <label>
            Iframe URL
            <input
              type="text"
              value={url}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </label>
          <button onClick={handleLoad}>Load</button>
        </div>
        {src && (
          <iframe
            src={src}
            title="Iframe Tester"
            width="100%"
            height="400"
            style={{ border: "1px solid #ccc", borderRadius: 4 }}
          />
        )}
      </div>
    </CalculationContainer>
  );
};

export default IframeTester;
