import React, { useState, useEffect } from "react";
import CalculationContainer from "./container";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

const algorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

export default function HashGenerator() {
  const [inputText, setInputText] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({
    "SHA-1": "",
    "SHA-256": "",
    "SHA-384": "",
    "SHA-512": "",
  });

  useEffect(() => {
    async function calculateHashes() {
      if (!inputText) {
        setHashes({
          "SHA-1": "",
          "SHA-256": "",
          "SHA-384": "",
          "SHA-512": "",
        });
        return;
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);

      const newHashes: Record<string, string> = {};
      for (const algo of algorithms) {
        try {
          const hashBuffer = await crypto.subtle.digest(algo, data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
          newHashes[algo] = hashHex;
        } catch (e) {
          newHashes[algo] = "Error";
        }
      }
      setHashes(newHashes);
    }

    calculateHashes();
  }, [inputText]);

  return (
    <CalculationContainer>
      <h4 className="w-full text-center mb-0 text-xl font-semibold">Hash Generator</h4>
      <div className="w-full flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="hash-input">Input Text</Label>
          <Textarea
            id="hash-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type text to hash..."
            className="w-full min-h-[120px]"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          {algorithms.map((algo) => (
            <div key={algo} className="flex flex-col gap-1 w-full">
              <Label>{algo}</Label>
              <Input
                readOnly
                value={hashes[algo]}
                placeholder={`${algo} hash will appear here`}
                className="font-mono text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </CalculationContainer>
  );
}
