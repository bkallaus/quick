import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';

const ProportionCalculator = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [x, setX] = useState('');

  const calculate = () => {
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);
    const valX = parseFloat(x);

    // Count how many fields are filled with valid numbers
    const values = [
      { key: 'a', val: valA },
      { key: 'b', val: valB },
      { key: 'c', val: valC },
      { key: 'x', val: valX }
    ].filter(v => !isNaN(v.val));

    if (values.length !== 3) {
      alert('Please enter exactly 3 values to calculate the 4th.');
      return;
    }

    // A / B = C / X
    if (isNaN(valX)) {
      // Find X: X = (C * B) / A
      if (valA === 0) {
        alert('Division by zero error (A is 0).');
        return;
      }
      setX(String((valC * valB) / valA));
    } else if (isNaN(valA)) {
      // Find A: A = (C * B) / X
      if (valX === 0) {
        alert('Division by zero error (X is 0).');
        return;
      }
      setA(String((valC * valB) / valX));
    } else if (isNaN(valB)) {
      // Find B: B = (A * X) / C
      if (valC === 0) {
        alert('Division by zero error (C is 0).');
        return;
      }
      setB(String((valA * valX) / valC));
    } else if (isNaN(valC)) {
      // Find C: C = (A * X) / B
      if (valB === 0) {
        alert('Division by zero error (B is 0).');
        return;
      }
      setC(String((valA * valX) / valB));
    }
  };

  const clear = () => {
    setA('');
    setB('');
    setC('');
    setX('');
  };

  return (
    <Card className="w-full max-w-md mx-auto" id="proportion-calculator">
      <CardHeader>
        <CardTitle>Proportion Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Enter any 3 values to find the 4th. (A / B = C / X)
          </p>
          <div className="flex items-center justify-center gap-4 text-lg font-semibold mt-4">
            <div className="flex flex-col gap-2">
              <Input
                type="number"
                placeholder="A"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-24 text-center font-mono"
                aria-label="Value A"
              />
              <div className="h-px bg-border w-full" />
              <Input
                type="number"
                placeholder="B"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="w-24 text-center font-mono"
                aria-label="Value B"
              />
            </div>
            <span className="mb-2">=</span>
            <div className="flex flex-col gap-2">
              <Input
                type="number"
                placeholder="C"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className="w-24 text-center font-mono"
                aria-label="Value C"
              />
              <div className="h-px bg-border w-full" />
              <Input
                type="number"
                placeholder="X"
                value={x}
                onChange={(e) => setX(e.target.value)}
                className="w-24 text-center font-mono"
                aria-label="Value X"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={calculate} className="flex-1">Calculate</Button>
          <Button variant="outline" onClick={clear} className="flex-1">Clear</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProportionCalculator;