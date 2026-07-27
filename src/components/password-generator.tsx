import CalculationContainer from "./container";
import React, { useState, useEffect, useCallback } from "react";

interface PasswordHistoryItem {
  password: string;
  timestamp: number;
}

const HISTORY_KEY = "passwordHistory";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState<PasswordHistoryItem[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed: PasswordHistoryItem[] = JSON.parse(stored);
        const now = Date.now();
        const validHistory = parsed.filter(
          (item) => now - item.timestamp < THIRTY_DAYS_MS
        );
        if (validHistory.length !== parsed.length) {
          localStorage.setItem(HISTORY_KEY, JSON.stringify(validHistory));
        }
        setHistory(validHistory);
      }
    } catch (e) {
      console.error("Failed to load password history", e);
    }
  }, []);

  const saveToHistory = useCallback((newPassword: string) => {
    setHistory((prev) => {
      const now = Date.now();
      const newHistory = [{ password: newPassword, timestamp: now }, ...prev];
      // Keep only last 30 days
      const validHistory = newHistory.filter(
        (item) => now - item.timestamp < THIRTY_DAYS_MS
      );
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(validHistory));
      } catch (e) {
        console.error("Failed to save password history", e);
      }
      return validHistory;
    });
  }, []);

  const copyToClipboard = async (text: string, setCopiedState?: (val: boolean) => void) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (setCopiedState) {
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let chars = "";
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === "") {
      setPassword("");
      return;
    }

    let generatedPassword = "";
    if (window.crypto && window.crypto.getRandomValues) {
      const randomValues = new Uint32Array(length);
      window.crypto.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        generatedPassword += chars[randomValues[i] % chars.length];
      }
    } else {
      for (let i = 0; i < length; i++) {
        generatedPassword += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    setPassword(generatedPassword);
    setCopied(false);
    if (generatedPassword) {
      saveToHistory(generatedPassword);
    }
  };

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Password Generator</h4>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
        <label>
          Length
          <input
            type="number"
            min={1}
            max={128}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>

        <fieldset>
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Uppercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            Lowercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Symbols
          </label>
        </fieldset>

        <button onClick={generatePassword}>Generate Password</button>

        <label>
          Generated Password
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input type="text" readOnly value={password} style={{ flex: 1, margin: 0 }} />
            <button
              onClick={() => copyToClipboard(password, setCopied)}
              disabled={!password}
              style={{ width: "auto", margin: 0 }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </label>

        {history.length > 0 && (
          <div style={{ marginTop: "16px" }}>
            <h5 style={{ marginBottom: "8px" }}>History (Last 30 Days)</h5>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {history.map((item, index) => (
                <li key={index} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <input type="text" readOnly value={item.password} style={{ flex: 1, margin: 0 }} />
                  <button
                    onClick={() => copyToClipboard(item.password)}
                    style={{ width: "auto", margin: 0 }}
                  >
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </CalculationContainer>
  );
};

export default PasswordGenerator;
