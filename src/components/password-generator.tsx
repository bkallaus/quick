import CalculationContainer from "./container";
import React, { useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

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
          <input type="text" readOnly value={password} />
        </label>
      </div>
    </CalculationContainer>
  );
};

export default PasswordGenerator;
