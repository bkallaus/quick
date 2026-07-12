import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import CalculationContainer from "./container";

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(100);
  const [discountPercent, setDiscountPercent] = useState<number | undefined>(20);

  const finalPrice = (originalPrice || 0) * (1 - (discountPercent || 0) / 100);
  const savings = (originalPrice || 0) - finalPrice;

  return (
    <CalculationContainer>
      <h4 style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>Discount</h4>

      <div style={{ width: "100%", display: "flex", gap: "16px", alignItems: "flex-end" }}>
        <label style={{ flex: 1 }}>
          Original Price
          <NumericFormat
            value={originalPrice}
            thousandSeparator=","
            prefix="$"
            allowNegative={false}
            onValueChange={(e) => setOriginalPrice(e.floatValue)}
          />
        </label>
        <label style={{ flex: 1 }}>
          Discount %
          <NumericFormat
            value={discountPercent}
            allowNegative={false}
            suffix="%"
            onValueChange={(e) => setDiscountPercent(e.floatValue)}
          />
        </label>
      </div>

      <div style={{ width: "100%", display: "flex", gap: "16px", marginTop: "16px" }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <strong>Final Price:</strong> <br/>
          ${finalPrice.toFixed(2)}
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <strong>Savings:</strong> <br/>
          ${savings.toFixed(2)}
        </div>
      </div>
    </CalculationContainer>
  );
};

export default DiscountCalculator;
