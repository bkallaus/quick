import React, { useState, useEffect } from "react";
import CalculationContainer from "./container";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState<string>("1000");
  const [rate, setRate] = useState<string>("5");
  const [years, setYears] = useState<string>("10");
  const [frequency, setFrequency] = useState<number>(1);
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  useEffect(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = frequency;

    if (!isNaN(p) && !isNaN(r) && !isNaN(t) && p >= 0 && r >= 0 && t >= 0) {
      const fv = p * Math.pow(1 + r / n, n * t);
      setFutureValue(fv);
      setTotalInterest(fv - p);
    } else {
      setFutureValue(null);
      setTotalInterest(null);
    }
  }, [principal, rate, years, frequency]);

  const formatCurrency = (value: number | null) => {
    if (value === null) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <CalculationContainer>
      <h4 className="w-full text-center mb-0 text-xl font-semibold">Compound Interest Calculator</h4>
      <div className="w-full flex flex-col gap-6 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="principal">Principal Amount ($)</Label>
            <Input
              id="principal"
              type="number"
              min="0"
              step="any"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g. 1000"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              min="0"
              step="any"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 5"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="years">Years</Label>
            <Input
              id="years"
              type="number"
              min="0"
              step="any"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g. 10"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="frequency">Compounding Frequency</Label>
            <select
              id="frequency"
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
            >
              <option value={1}>Annually (1/yr)</option>
              <option value={2}>Semi-Annually (2/yr)</option>
              <option value={4}>Quarterly (4/yr)</option>
              <option value={12}>Monthly (12/yr)</option>
              <option value={365}>Daily (365/yr)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2 p-4 bg-muted rounded-lg border border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Future Value:</span>
            <span className="text-xl font-bold">{formatCurrency(futureValue)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Total Interest Earned:</span>
            <span className="text-lg font-semibold text-green-600 dark:text-green-400">
              {formatCurrency(totalInterest)}
            </span>
          </div>
        </div>
      </div>
    </CalculationContainer>
  );
};

export default CompoundInterest;
