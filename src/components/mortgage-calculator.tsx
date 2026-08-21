import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState<number | ''>(300000);
  const [interestRate, setInterestRate] = useState<number | ''>(5);
  const [loanTerm, setLoanTerm] = useState<number | ''>(30);

  const results = useMemo(() => {
    const p = Number(principal);
    const r = Number(interestRate);
    const t = Number(loanTerm);

    if (!p || !r || !t || p <= 0 || r <= 0 || t <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    }

    const monthlyInterestRate = r / 100 / 12;
    const numberOfPayments = t * 12;

    const numerator = p * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    const monthlyPayment = numerator / denominator;

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - p;

    return {
      monthlyPayment,
      totalInterest,
      totalPayment,
    };
  }, [principal, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Mortgage Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="principal">Loan Amount ($)</Label>
            <Input
              id="principal"
              type="number"
              min="0"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 300000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              min="0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term (Years)</Label>
            <Input
              id="loanTerm"
              type="number"
              min="1"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 30"
            />
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Monthly Payment:</span>
              <span className="font-bold text-primary">{formatCurrency(results.monthlyPayment)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Total Interest:</span>
              <span>{formatCurrency(results.totalInterest)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Total Payment:</span>
              <span>{formatCurrency(results.totalPayment)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
