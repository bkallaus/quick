import React, { useState } from "react";
import CalculationContainer from "./container";
import { NumericFormat } from "react-number-format";

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState<number | undefined>();
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);

  const bill = billAmount || 0;
  const tipAmount = (bill * tipPercentage) / 100;
  const totalAmount = bill + tipAmount;

  const tipPerPerson = numberOfPeople > 0 ? tipAmount / numberOfPeople : 0;
  const totalPerPerson = numberOfPeople > 0 ? totalAmount / numberOfPeople : 0;

  return (
    <CalculationContainer>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
        <h4 style={{ textAlign: "center", marginBottom: 0 }}>Tip Calculator</h4>

        <div style={{ display: "flex", gap: "16px", alignItems: "flex-end", flexWrap: "wrap" }}>
          <label style={{ flex: 1, minWidth: "150px" }}>
            Bill Amount
            <NumericFormat
              value={billAmount}
              onValueChange={(values) => {
                setBillAmount(values.floatValue);
              }}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              allowNegative={false}
              placeholder="$0.00"
            />
          </label>
          <label style={{ flex: 1, minWidth: "150px" }}>
            Tip Percentage
            <NumericFormat
              value={tipPercentage}
              onValueChange={(values) => {
                setTipPercentage(values.floatValue || 0);
              }}
              suffix={"%"}
              decimalScale={0}
              allowNegative={false}
              isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue === undefined || (floatValue >= 0 && floatValue <= 100);
              }}
            />
          </label>
          <label style={{ flex: 1, minWidth: "150px" }}>
            Number of People
            <NumericFormat
              value={numberOfPeople}
              onValueChange={(values) => {
                setNumberOfPeople(values.floatValue || 1);
              }}
              decimalScale={0}
              allowNegative={false}
              isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue === undefined || floatValue > 0;
              }}
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "16px" }}>
           <div style={{ flex: 1, padding: "16px", backgroundColor: "var(--pico-card-background-color)", borderRadius: "var(--pico-border-radius)", border: "1px solid var(--pico-card-border-color)" }}>
             <h6 style={{ margin: 0, color: "var(--pico-muted-color)" }}>Tip Amount</h6>
             <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                <NumericFormat value={tipAmount} displayType={"text"} thousandSeparator={true} prefix={"$"} decimalScale={2} fixedDecimalScale={true} />
             </div>
             {numberOfPeople > 1 && (
               <div style={{ fontSize: "0.875rem", color: "var(--pico-muted-color)" }}>
                 <NumericFormat value={tipPerPerson} displayType={"text"} thousandSeparator={true} prefix={"$"} decimalScale={2} fixedDecimalScale={true} /> / person
               </div>
             )}
           </div>

           <div style={{ flex: 1, padding: "16px", backgroundColor: "var(--pico-card-background-color)", borderRadius: "var(--pico-border-radius)", border: "1px solid var(--pico-card-border-color)" }}>
             <h6 style={{ margin: 0, color: "var(--pico-muted-color)" }}>Total Amount</h6>
             <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                <NumericFormat value={totalAmount} displayType={"text"} thousandSeparator={true} prefix={"$"} decimalScale={2} fixedDecimalScale={true} />
             </div>
             {numberOfPeople > 1 && (
               <div style={{ fontSize: "0.875rem", color: "var(--pico-muted-color)" }}>
                 <NumericFormat value={totalPerPerson} displayType={"text"} thousandSeparator={true} prefix={"$"} decimalScale={2} fixedDecimalScale={true} /> / person
               </div>
             )}
           </div>
        </div>
      </div>
    </CalculationContainer>
  );
};

export default TipCalculator;
