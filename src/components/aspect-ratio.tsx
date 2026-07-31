import CalculationContainer from "./container";
import React, { useState } from "react";

const AspectRatio = () => {
  const [originalWidth, setOriginalWidth] = useState<number | "">("");
  const [originalHeight, setOriginalHeight] = useState<number | "">("");
  const [newWidth, setNewWidth] = useState<number | "">("");
  const [newHeight, setNewHeight] = useState<number | "">("");

  const calculateNewHeight = (ow: number, oh: number, nw: number) => {
    return Math.round((oh / ow) * nw);
  };

  const calculateNewWidth = (ow: number, oh: number, nh: number) => {
    return Math.round((ow / oh) * nh);
  };

  const handleOriginalWidthChange = (val: string) => {
    const ow = val === "" ? "" : Number(val);
    setOriginalWidth(ow);
    if (typeof ow === "number" && ow > 0 && typeof originalHeight === "number") {
      if (typeof newWidth === "number") {
        setNewHeight(calculateNewHeight(ow, originalHeight, newWidth));
      } else if (typeof newHeight === "number") {
        setNewWidth(calculateNewWidth(ow, originalHeight, newHeight));
      }
    }
  };

  const handleOriginalHeightChange = (val: string) => {
    const oh = val === "" ? "" : Number(val);
    setOriginalHeight(oh);
    if (typeof oh === "number" && oh > 0 && typeof originalWidth === "number" && originalWidth > 0) {
      if (typeof newWidth === "number") {
        setNewHeight(calculateNewHeight(originalWidth, oh, newWidth));
      } else if (typeof newHeight === "number") {
        setNewWidth(calculateNewWidth(originalWidth, oh, newHeight));
      }
    }
  };

  const handleNewWidthChange = (val: string) => {
    const nw = val === "" ? "" : Number(val);
    setNewWidth(nw);
    if (typeof nw === "number" && typeof originalWidth === "number" && typeof originalHeight === "number" && originalWidth > 0) {
      setNewHeight(calculateNewHeight(originalWidth, originalHeight, nw));
    }
  };

  const handleNewHeightChange = (val: string) => {
    const nh = val === "" ? "" : Number(val);
    setNewHeight(nh);
    if (typeof nh === "number" && typeof originalWidth === "number" && typeof originalHeight === "number" && originalHeight > 0) {
      setNewWidth(calculateNewWidth(originalWidth, originalHeight, nh));
    }
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Aspect Ratio Calculator</h4>
      <div style={{ width: "100%", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <fieldset style={{ flex: 1, border: "none", padding: 0, margin: 0 }}>
          <legend style={{ marginBottom: "8px" }}>Original</legend>
          <div style={{ display: "flex", gap: "8px" }}>
            <label style={{ flex: 1 }}>
              Width
              <input
                type="number"
                value={originalWidth}
                onChange={(e) => handleOriginalWidthChange(e.target.value)}
                placeholder="1920"
              />
            </label>
            <label style={{ flex: 1 }}>
              Height
              <input
                type="number"
                value={originalHeight}
                onChange={(e) => handleOriginalHeightChange(e.target.value)}
                placeholder="1080"
              />
            </label>
          </div>
        </fieldset>

        <fieldset style={{ flex: 1, border: "none", padding: 0, margin: 0 }}>
          <legend style={{ marginBottom: "8px" }}>New</legend>
          <div style={{ display: "flex", gap: "8px" }}>
            <label style={{ flex: 1 }}>
              Width
              <input
                type="number"
                value={newWidth}
                onChange={(e) => handleNewWidthChange(e.target.value)}
                placeholder="1280"
              />
            </label>
            <label style={{ flex: 1 }}>
              Height
              <input
                type="number"
                value={newHeight}
                onChange={(e) => handleNewHeightChange(e.target.value)}
                placeholder="720"
              />
            </label>
          </div>
        </fieldset>
      </div>
    </CalculationContainer>
  );
};

export default AspectRatio;
