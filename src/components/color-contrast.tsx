import React, { useState, useEffect } from "react";
import CalculationContainer from "./container";

// Calculate relative luminance based on WCAG 2.0 standards
const getLuminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Convert hex string to RGB array
const hexToRgb = (hex: string) => {
  let h = hex.replace(/^#/, "");
  if (h.length === 3) {
    h = h.split("").map(c => c + c).join("");
  }
  if (h.length !== 6) return null;
  const num = parseInt(h, 16);
  return [num >> 16, (num >> 8) & 255, num & 255];
};

const calculateContrastRatio = (color1: string, color2: string) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return null;

  const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);

  const lightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (lightest + 0.05) / (darkest + 0.05);
};

const validateHex = (hex: string) => {
  return /^#?([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex);
};

const ColorContrast = () => {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#FFFFFF");
  const [ratio, setRatio] = useState<number | null>(21);

  useEffect(() => {
    if (validateHex(foreground) && validateHex(background)) {
      setRatio(calculateContrastRatio(foreground, background));
    } else {
      setRatio(null);
    }
  }, [foreground, background]);

  const handleForegroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForeground(e.target.value);
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackground(e.target.value);
  };

  const getWcagStatus = (ratio: number | null) => {
    if (ratio === null) return { aaNormal: "Fail", aaLarge: "Fail", aaaNormal: "Fail", aaaLarge: "Fail" };
    return {
      aaNormal: ratio >= 4.5 ? "Pass" : "Fail",
      aaLarge: ratio >= 3.0 ? "Pass" : "Fail",
      aaaNormal: ratio >= 7.0 ? "Pass" : "Fail",
      aaaLarge: ratio >= 4.5 ? "Pass" : "Fail",
    };
  };

  const status = getWcagStatus(ratio);

  const getValidColorInputValue = (hex: string, defaultHex: string) => {
    if (!validateHex(hex)) return defaultHex;
    let h = hex.startsWith("#") ? hex : `#${hex}`;
    if (h.length === 4) {
      h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
    }
    return h;
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Color Contrast Checker</h4>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
        <div style={{ display: "flex", gap: "16px" }}>
          <label style={{ flex: 1 }}>
            Foreground Color (Hex)
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                    type="color"
                    value={getValidColorInputValue(foreground, "#000000")}
                    onChange={handleForegroundChange}
                    style={{ width: "40px", height: "40px", padding: 0, border: "1px solid var(--pico-muted-border-color)", cursor: "pointer", background: "none" }}
                />
                <input
                type="text"
                value={foreground}
                onChange={handleForegroundChange}
                placeholder="#000000"
                style={{ flex: 1, margin: 0 }}
                />
            </div>
          </label>
          <label style={{ flex: 1 }}>
            Background Color (Hex)
             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                    type="color"
                    value={getValidColorInputValue(background, "#ffffff")}
                    onChange={handleBackgroundChange}
                    style={{ width: "40px", height: "40px", padding: 0, border: "1px solid var(--pico-muted-border-color)", cursor: "pointer", background: "none" }}
                />
                <input
                type="text"
                value={background}
                onChange={handleBackgroundChange}
                placeholder="#FFFFFF"
                style={{ flex: 1, margin: 0 }}
                />
            </div>
          </label>
        </div>

        <div
          style={{
            padding: "2rem",
            marginTop: "16px",
            borderRadius: "4px",
            backgroundColor: validateHex(background) ? (background.startsWith("#") ? background : `#${background}`) : "#fff",
            color: validateHex(foreground) ? (foreground.startsWith("#") ? foreground : `#${foreground}`) : "#000",
            textAlign: "center",
            border: "1px solid var(--pico-muted-border-color)"
          }}
        >
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Preview Text</div>
          <div style={{ fontSize: "1rem" }}>This is how normal text will look.</div>
        </div>

        {ratio !== null ? (
            <div style={{ marginTop: "16px" }}>
                <h5 style={{ textAlign: "center" }}>Contrast Ratio: {ratio.toFixed(2)}:1</h5>

                <table role="grid">
                    <thead>
                        <tr>
                            <th scope="col">Standard</th>
                            <th scope="col">Normal Text</th>
                            <th scope="col">Large Text</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">WCAG AA</th>
                            <td>{status.aaNormal === "Pass" ? "✅ Pass" : "❌ Fail"}</td>
                            <td>{status.aaLarge === "Pass" ? "✅ Pass" : "❌ Fail"}</td>
                        </tr>
                        <tr>
                            <th scope="row">WCAG AAA</th>
                            <td>{status.aaaNormal === "Pass" ? "✅ Pass" : "❌ Fail"}</td>
                            <td>{status.aaaLarge === "Pass" ? "✅ Pass" : "❌ Fail"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ) : (
            <div style={{ marginTop: "16px", textAlign: "center", color: "var(--pico-color)" }}>
                Invalid hex color(s).
            </div>
        )}
      </div>
    </CalculationContainer>
  );
};

export default ColorContrast;
