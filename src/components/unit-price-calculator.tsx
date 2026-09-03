import React, { useState } from 'react';
import CalculationContainer from './container';
import { Input } from './ui/input';
import { Label } from './ui/label';

const UnitPriceCalculator = () => {
  const [itemAPrice, setItemAPrice] = useState<string>('');
  const [itemASize, setItemASize] = useState<string>('');
  const [itemBPrice, setItemBPrice] = useState<string>('');
  const [itemBSize, setItemBSize] = useState<string>('');

  const aPrice = parseFloat(itemAPrice);
  const aSize = parseFloat(itemASize);
  const bPrice = parseFloat(itemBPrice);
  const bSize = parseFloat(itemBSize);

  const aUnitPrice = (aPrice > 0 && aSize > 0) ? (aPrice / aSize) : null;
  const bUnitPrice = (bPrice > 0 && bSize > 0) ? (bPrice / bSize) : null;

  let bestDeal = '';
  if (aUnitPrice !== null && bUnitPrice !== null) {
    if (aUnitPrice < bUnitPrice) {
      bestDeal = 'Item A is the better deal';
    } else if (bUnitPrice < aUnitPrice) {
      bestDeal = 'Item B is the better deal';
    } else {
      bestDeal = 'Both items have the same unit price';
    }
  }

  const formatUnit = (val: number | null) => {
      if (val === null) return '-';
      return `$${val.toFixed(4)}`;
  }

  return (
    <div className="w-full flex flex-col gap-6" id="unit-price-calculator">
      <h2 className="text-2xl font-bold text-center">Unit Price Calculator</h2>
      <CalculationContainer>
        <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-stretch">

          {/* Item A */}
          <div className="flex-1 flex flex-col gap-4 p-4 border rounded-lg bg-card/50">
            <h3 className="text-xl font-semibold text-center mb-2">Item A</h3>
            <div className="space-y-2">
              <Label htmlFor="item-a-price">Price ($)</Label>
              <Input
                id="item-a-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={itemAPrice}
                onChange={(e) => setItemAPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-a-size">Size (Quantity)</Label>
              <Input
                id="item-a-size"
                type="number"
                min="0"
                step="0.1"
                placeholder="0"
                value={itemASize}
                onChange={(e) => setItemASize(e.target.value)}
              />
            </div>
            <div className="mt-4 text-center p-3 bg-muted rounded-md" data-testid="item-a-unit">
              <span className="text-sm text-muted-foreground block">Unit Price</span>
              <span className="text-lg font-mono font-medium">{formatUnit(aUnitPrice)}</span>
            </div>
          </div>

          {/* Item B */}
          <div className="flex-1 flex flex-col gap-4 p-4 border rounded-lg bg-card/50">
            <h3 className="text-xl font-semibold text-center mb-2">Item B</h3>
            <div className="space-y-2">
              <Label htmlFor="item-b-price">Price ($)</Label>
              <Input
                id="item-b-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={itemBPrice}
                onChange={(e) => setItemBPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-b-size">Size (Quantity)</Label>
              <Input
                id="item-b-size"
                type="number"
                min="0"
                step="0.1"
                placeholder="0"
                value={itemBSize}
                onChange={(e) => setItemBSize(e.target.value)}
              />
            </div>
            <div className="mt-4 text-center p-3 bg-muted rounded-md" data-testid="item-b-unit">
              <span className="text-sm text-muted-foreground block">Unit Price</span>
              <span className="text-lg font-mono font-medium">{formatUnit(bUnitPrice)}</span>
            </div>
          </div>
        </div>

        {/* Result */}
        {bestDeal && (
          <div className="w-full mt-4 p-4 text-center rounded-lg bg-primary/10 border border-primary/20" data-testid="best-deal">
            <h3 className="text-xl font-semibold text-primary">{bestDeal}</h3>
          </div>
        )}
      </CalculationContainer>
    </div>
  );
};

export default UnitPriceCalculator;
