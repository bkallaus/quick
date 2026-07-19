import CalculationContainer from "./container";
import React from "react";

const AspectRatio = () => {
  const [origW, setOrigW] = React.useState<number | "">("");
  const [origH, setOrigH] = React.useState<number | "">("");
  const [newW, setNewW] = React.useState<number | "">("");
  const [newH, setNewH] = React.useState<number | "">("");

  const handleOrigWChange = (val: string) => {
    const num = val === "" ? "" : Number(val);
    setOrigW(num);
    if (num !== "" && origH !== "" && newW !== "") {
      const calculatedNewH = Number(newW) * (Number(origH) / Number(num));
      setNewH(parseFloat(calculatedNewH.toFixed(2)));
    }
  };

  const handleOrigHChange = (val: string) => {
    const num = val === "" ? "" : Number(val);
    setOrigH(num);
    if (num !== "" && origW !== "" && newW !== "") {
      const calculatedNewH = Number(newW) * (Number(num) / Number(origW));
      setNewH(parseFloat(calculatedNewH.toFixed(2)));
    }
  };

  const handleNewWChange = (val: string) => {
    const num = val === "" ? "" : Number(val);
    setNewW(num);
    if (num !== "" && origW !== "" && origH !== "") {
      const calculatedNewH = Number(num) * (Number(origH) / Number(origW));
      setNewH(parseFloat(calculatedNewH.toFixed(2)));
    } else {
      setNewH("");
    }
  };

  const handleNewHChange = (val: string) => {
    const num = val === "" ? "" : Number(val);
    setNewH(num);
    if (num !== "" && origW !== "" && origH !== "") {
      const calculatedNewW = Number(num) * (Number(origW) / Number(origH));
      setNewW(parseFloat(calculatedNewW.toFixed(2)));
    } else {
      setNewW("");
    }
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Aspect Ratio Calculator</h4>
      <div style={{ width: "100%", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "16px", flex: "1 1 100%" }}>
          <label style={{ flex: 1 }}>
            Original Width
            <input
              type="number"
              value={origW}
              onChange={(e) => handleOrigWChange(e.target.value)}
              placeholder="e.g. 1920"
              data-testid="orig-w"
            />
          </label>
          <label style={{ flex: 1 }}>
            Original Height
            <input
              type="number"
              value={origH}
              onChange={(e) => handleOrigHChange(e.target.value)}
              placeholder="e.g. 1080"
              data-testid="orig-h"
            />
          </label>
        </div>
        <div style={{ display: "flex", gap: "16px", flex: "1 1 100%" }}>
          <label style={{ flex: 1 }}>
            New Width
            <input
              type="number"
              value={newW}
              onChange={(e) => handleNewWChange(e.target.value)}
              placeholder="e.g. 1280"
              data-testid="new-w"
            />
          </label>
          <label style={{ flex: 1 }}>
            New Height
            <input
              type="number"
              value={newH}
              onChange={(e) => handleNewHChange(e.target.value)}
              placeholder="e.g. 720"
              data-testid="new-h"
            />
          </label>
        </div>
      </div>
    </CalculationContainer>
  );
};

export default AspectRatio;
