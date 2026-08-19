import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

const DateDifference: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
       return null;
    }

    // Absolute difference in milliseconds
    const diffTime = Math.abs(end.getTime() - start.getTime());

    // Calculate raw differences
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Approximate higher units
    const diffWeeks = (diffDays / 7).toFixed(1);
    const diffMonths = (diffDays / 30.436875).toFixed(1);
    const diffYears = (diffDays / 365.2425).toFixed(1);

    return {
      days: diffDays,
      weeks: diffWeeks.replace(/\.0$/, ''),
      months: diffMonths.replace(/\.0$/, ''),
      years: diffYears.replace(/\.0$/, '')
    };
  };

  const diff = calculateDifference();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Date Difference</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {diff && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="flex flex-col bg-muted/50 p-4 rounded-lg items-center justify-center text-center">
              <span className="text-3xl font-bold text-primary">{diff.days}</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Days</span>
            </div>
            <div className="flex flex-col bg-muted/50 p-4 rounded-lg items-center justify-center text-center">
              <span className="text-3xl font-bold text-primary">{diff.weeks}</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Weeks</span>
            </div>
            <div className="flex flex-col bg-muted/50 p-4 rounded-lg items-center justify-center text-center">
              <span className="text-3xl font-bold text-primary">{diff.months}</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Months</span>
            </div>
            <div className="flex flex-col bg-muted/50 p-4 rounded-lg items-center justify-center text-center">
              <span className="text-3xl font-bold text-primary">{diff.years}</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Years</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DateDifference;
