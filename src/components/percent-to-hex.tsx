import CalculationContainer from "./container";
import { PatternFormat } from "react-number-format";
import React from "react";

const PercentToHex = () => {
  const [baseTenValue, setBaseTenValue] = React.useState(0);
  const [hexValue, setHexValue] = React.useState("");
  const [percentValue, setPercentValue] = React.useState(0);

  const onPercentChange = (percent: number) => {
    const base10 = Math.round((percent * 255) / 100);
    setPercentValue(percent);
    setBaseTenValue(base10);

    let hex = "";
    if (base10 < 16) {
      hex = "0" + base10.toString(16).toUpperCase();
    } else {
      hex = base10.toString(16).toUpperCase();
    }

    setHexValue(hex);
  };

  const onBaseTenChange = (base10: number) => {
    const percent = Math.round((base10 / 255) * 100);
    setPercentValue(percent);
    setBaseTenValue(base10);

    let hex = "";
    if (base10 < 16) {
      hex = "0" + base10.toString(16).toUpperCase();
    } else {
      hex = base10.toString(16).toUpperCase();
    }

    setHexValue(hex);
  };

  const onHexChange = (hex: string) => {
    const base10 = Number.parseInt(hex, 16);
    setPercentValue(Math.round((base10 / 255) * 100));
    setBaseTenValue(base10);
    setHexValue(hex);
  };

  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const copyHexToClipboard = () => {
    navigator.clipboard.writeText(hexValue);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Percent to Hex</h4>
      <label>
        Percent
        <PatternFormat
          value={percentValue}
          format={"###%"}
          type="text"
          onValueChange={({ value }: { value: string }) =>
            onPercentChange(Number(value))
          }
        />
      </label>
      <div>
        <label htmlFor="hex-input">Hex</label>
        <fieldset role="group">
          <input
            id="hex-input"
            onChange={(e) => onHexChange(e.target.value)}
            value={hexValue}
            aria-label="Hex Value"
          />
          <button
            aria-label={copied ? "Copied" : "Copy Hex Value"}
            onClick={copyHexToClipboard}
            style={{ width: "auto", padding: "0 1rem" }}
            type="button"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </fieldset>
      </div>
      <label>
        Base 10
        <input
          type="number"
          onChange={(e) => onBaseTenChange(Number(e.target.value))}
          value={baseTenValue}
        />
      </label>
    </CalculationContainer>
  );
};

export default PercentToHex;
