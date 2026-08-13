import React, { useState } from 'react';
import Container from './container';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

const encodeHtml = (str: string) => {
  return str.replace(/[\u00A0-\u9999<>\&"']/g, function (i) {
    return '&#' + i.charCodeAt(0) + ';';
  });
};

const decodeHtml = (str: string) => {
  return str.replace(/&#([0-9]{1,7});/g, function (g, m1) {
    return String.fromCharCode(parseInt(m1, 10));
  }).replace(/&[a-zA-Z0-9]+;/g, function (match) {
    const el = document.createElement('textarea');
    el.innerHTML = match;
    return el.value;
  });
};

const HtmlEntityEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    setOutput(encodeHtml(input));
  };

  const handleDecode = () => {
    setOutput(decodeHtml(input));
  };

  return (
    <Container>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">HTML Entity Encoder / Decoder</h2>
        <div className="grid gap-2">
          <Label htmlFor="html-input">Input text</Label>
          <Textarea
            id="html-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode or decode..."
            className="min-h-[100px]"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleEncode}>Encode</Button>
          <Button variant="secondary" onClick={handleDecode}>Decode</Button>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="html-output">Output</Label>
          <Textarea
            id="html-output"
            value={output}
            readOnly
            className="min-h-[100px] bg-muted"
          />
        </div>
      </div>
    </Container>
  );
};

export default HtmlEntityEncoder;
