import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import Container from "./container";

export default function CssBoxShadowGenerator() {
  const [horizontalOffset, setHorizontalOffset] = useState(10);
  const [verticalOffset, setVerticalOffset] = useState(10);
  const [blurRadius, setBlurRadius] = useState(15);
  const [spreadRadius, setSpreadRadius] = useState(0);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowOpacity, setShadowOpacity] = useState(25);
  const [boxColor, setBoxColor] = useState("#3b82f6");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);

  // Helper to convert hex and opacity to rgba
  const hexToRgba = (hex: string, opacity: number) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  const shadowString = `${inset ? "inset " : ""}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(shadowColor, shadowOpacity)}`;
  const cssString = `box-shadow: ${shadowString};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Container>
      <div className="w-full flex flex-col gap-6" id="css-box-shadow-generator">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2">CSS Box Shadow Generator</h2>
          <p className="text-muted-foreground">Visually design and generate CSS box-shadow styles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="horizontal">Horizontal Offset</Label>
                <span className="text-sm text-muted-foreground">{horizontalOffset}px</span>
              </div>
              <Slider
                id="horizontal"
                min={-50}
                max={50}
                value={[horizontalOffset]}
                onValueChange={(val) => setHorizontalOffset(val[0])}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="vertical">Vertical Offset</Label>
                <span className="text-sm text-muted-foreground">{verticalOffset}px</span>
              </div>
              <Slider
                id="vertical"
                min={-50}
                max={50}
                value={[verticalOffset]}
                onValueChange={(val) => setVerticalOffset(val[0])}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="blur">Blur Radius</Label>
                <span className="text-sm text-muted-foreground">{blurRadius}px</span>
              </div>
              <Slider
                id="blur"
                min={0}
                max={100}
                value={[blurRadius]}
                onValueChange={(val) => setBlurRadius(val[0])}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="spread">Spread Radius</Label>
                <span className="text-sm text-muted-foreground">{spreadRadius}px</span>
              </div>
              <Slider
                id="spread"
                min={-50}
                max={50}
                value={[spreadRadius]}
                onValueChange={(val) => setSpreadRadius(val[0])}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="opacity">Shadow Opacity</Label>
                <span className="text-sm text-muted-foreground">{shadowOpacity}%</span>
              </div>
              <Slider
                id="opacity"
                min={0}
                max={100}
                value={[shadowOpacity]}
                onValueChange={(val) => setShadowOpacity(val[0])}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shadow-color">Shadow Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="shadow-color"
                    type="color"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="uppercase font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="box-color">Box Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="box-color"
                    type="color"
                    value={boxColor}
                    onChange={(e) => setBoxColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={boxColor}
                    onChange={(e) => setBoxColor(e.target.value)}
                    className="uppercase font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bg-color">Background</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="bg-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="uppercase font-mono text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <Checkbox
                  id="inset"
                  checked={inset}
                  onCheckedChange={(checked) => setInset(checked as boolean)}
                />
                <Label
                  htmlFor="inset"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Inset Shadow
                </Label>
              </div>
            </div>
          </div>

          {/* Preview Column */}
          <div className="flex flex-col space-y-6">
            <div
              className="flex-1 rounded-lg border flex items-center justify-center p-8 min-h-[300px] transition-colors"
              style={{ backgroundColor }}
            >
              <div
                className="w-48 h-48 rounded-md transition-all duration-200"
                style={{
                  backgroundColor: boxColor,
                  boxShadow: shadowString
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>CSS Output</Label>
              <div className="relative">
                <pre className="p-4 rounded-md bg-muted font-mono text-sm overflow-x-auto border">
                  <code>{cssString}</code>
                </pre>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={copyToClipboard}
                  title="Copy to clipboard"
                  aria-label="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
