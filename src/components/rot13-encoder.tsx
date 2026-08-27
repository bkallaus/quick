import React, { useState } from "react";
import CalculationContainer from "./container";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const rot13 = (str: string) => {
  return str.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
};

const Rot13Encoder = () => {
  const [plainText, setPlainText] = useState("");
  const [rot13Text, setRot13Text] = useState("");

  const handlePlainChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPlainText(value);
    setRot13Text(rot13(value));
  };

  const handleRot13Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRot13Text(value);
    setPlainText(rot13(value));
  };

  return (
    <CalculationContainer>
      <h4 className="w-full text-center mb-0 text-xl font-semibold">ROT13 Encoder/Decoder</h4>
      <div className="w-full flex gap-4 flex-wrap mt-4">
        <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
          <Label htmlFor="plain-text">Plain Text</Label>
          <Textarea
            id="plain-text"
            value={plainText}
            onChange={handlePlainChange}
            placeholder="Enter plain text..."
            className="w-full min-h-[120px]"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
          <Label htmlFor="rot13-text">ROT13 Text</Label>
          <Textarea
            id="rot13-text"
            value={rot13Text}
            onChange={handleRot13Change}
            placeholder="Enter ROT13 text..."
            className="w-full min-h-[120px]"
          />
        </div>
      </div>
    </CalculationContainer>
  );
};

export default Rot13Encoder;
