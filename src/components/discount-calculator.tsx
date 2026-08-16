import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import CalculationContainer from "./container";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(100);
  const [discountPercent, setDiscountPercent] = useState<number | undefined>(20);

  const calculateDiscount = () => {
    if (originalPrice === undefined || discountPercent === undefined) return { amount: 0, final: 0 };
    const amount = (originalPrice * discountPercent) / 100;
    const final = originalPrice - amount;
    return { amount, final };
  };

  const { amount, final } = calculateDiscount();

  return (
    <CalculationContainer>
      <h4 className="w-full text-center mb-0 text-xl font-semibold">Discount Calculator</h4>

      <div className="w-full flex gap-4 mt-4">
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="original-price">Original Price</Label>
          <NumericFormat
            id="original-price"
            value={originalPrice}
            thousandSeparator=","
            allowNegative={false}
            prefix="$"
            onValueChange={(e) => setOriginalPrice(e.floatValue)}
            customInput={Input}
            placeholder="$0.00"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="discount-percent">Discount %</Label>
          <NumericFormat
            id="discount-percent"
            value={discountPercent}
            allowNegative={false}
            suffix="%"
            isAllowed={(values) => {
              const { floatValue } = values;
              return floatValue === undefined || (floatValue >= 0 && floatValue <= 100);
            }}
            onValueChange={(e) => setDiscountPercent(e.floatValue)}
            customInput={Input}
            placeholder="0%"
          />
        </div>
      </div>

      <div className="w-full mt-6 p-4 bg-muted/30 rounded-lg flex justify-between items-center">
        <div className="flex flex-col items-center">
          <span className="text-sm text-muted-foreground">You Save</span>
          <span className="text-xl font-medium text-green-600">
            ${amount.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-muted-foreground">Final Price</span>
          <span className="text-2xl font-bold">
            ${final.toFixed(2)}
          </span>
        </div>
      </div>
    </CalculationContainer>
  );
};

export default DiscountCalculator;
