import React, { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import CalculationContainer from "./container";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    setError("");
    setCopied(false);

    if (isNaN(min) || isNaN(max)) {
      setError("Please enter valid numbers");
      setResult(null);
      return;
    }

    if (min > max) {
      setError("Min value cannot be greater than Max value");
      setResult(null);
      return;
    }

    // Generate a random integer between min and max (inclusive)
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(random);
  };

  const handleCopy = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-2">Random Number Generator</h2>
      <CalculationContainer>
        <div className="w-full space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="random-min">Min</Label>
              <Input
                id="random-min"
                type="number"
                value={min}
                onChange={(e) => setMin(parseInt(e.target.value, 10))}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="random-max">Max</Label>
              <Input
                id="random-max"
                type="number"
                value={max}
                onChange={(e) => setMax(parseInt(e.target.value, 10))}
              />
            </div>
          </div>

          <Button onClick={generate} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate
          </Button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {result !== null && (
            <div className="mt-6 space-y-2">
              <Label htmlFor="random-result">Result</Label>
              <div className="flex gap-2">
                <Input
                  id="random-result"
                  readOnly
                  value={result}
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copied && <p className="text-sm text-green-600">Copied!</p>}
            </div>
          )}
        </div>
      </CalculationContainer>
    </div>
  );
}
