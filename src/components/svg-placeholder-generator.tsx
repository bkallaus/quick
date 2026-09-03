import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import CalculationContainer from './container';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function SvgPlaceholderGenerator() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [bgColor, setBgColor] = useState('#cccccc');
  const [textColor, setTextColor] = useState('#333333');
  const [text, setText] = useState('800x600');

  const [copiedDataUri, setCopiedDataUri] = useState(false);
  const [copiedSvg, setCopiedSvg] = useState(false);

  const svgString = useMemo(() => {
    const escapedText = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${escapedText}</text>
</svg>`;
  }, [width, height, bgColor, textColor, text]);

  const dataUri = useMemo(() => {
    // encodeURIComponent handles non-Latin1 characters correctly and avoids btoa InvalidCharacterError.
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
  }, [svgString]);

  const handleCopyDataUri = async () => {
    try {
      await navigator.clipboard.writeText(dataUri);
      setCopiedDataUri(true);
      setTimeout(() => setCopiedDataUri(false), 2000);
    } catch (err) {
      console.error('Failed to copy Data URI', err);
    }
  };

  const handleCopySvg = async () => {
    try {
      await navigator.clipboard.writeText(svgString);
      setCopiedSvg(true);
      setTimeout(() => setCopiedSvg(false), 2000);
    } catch (err) {
      console.error('Failed to copy SVG', err);
    }
  };

  return (
    <CalculationContainer>
      <div className="w-full flex flex-col gap-6" id="svg-placeholder-generator">
        <h2 className="text-2xl font-semibold text-center mb-4">SVG Placeholder Generator</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="svg-width">Width</Label>
                <Input
                  id="svg-width"
                  type="number"
                  min="1"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value) || 1)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="svg-height">Height</Label>
                <Input
                  id="svg-height"
                  type="number"
                  min="1"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value) || 1)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="svg-bg-color">Background Color</Label>
                <Input
                  id="svg-bg-color"
                  type="color"
                  className="p-1 h-10 cursor-pointer"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="svg-text-color">Text Color</Label>
                <Input
                  id="svg-text-color"
                  type="color"
                  className="p-1 h-10 cursor-pointer"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="svg-text">Text</Label>
              <Input
                id="svg-text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <Button onClick={handleCopyDataUri} variant="outline" className="w-full justify-start">
                {copiedDataUri ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                Copy Data URI
              </Button>
              <Button onClick={handleCopySvg} variant="outline" className="w-full justify-start">
                {copiedSvg ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                Copy SVG Code
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center">
            <Label>Preview</Label>
            <div
              className="border border-border rounded flex items-center justify-center overflow-hidden bg-white w-full max-w-sm aspect-video shadow-inner"
              style={{ padding: '1rem' }}
            >
              {/* Render the SVG natively. We scale it down with max-width and max-height for preview purposes while keeping actual logic dimensions intact */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-full object-contain"
              >
                <rect width="100%" height="100%" fill={bgColor}/>
                <text
                  x="50%"
                  y="50%"
                  fontFamily="sans-serif"
                  fontSize="24"
                  fill={textColor}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {text}
                </text>
              </svg>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Preview is scaled to fit. Actual dimensions will be {width}x{height}.
            </p>
          </div>
        </div>
      </div>
    </CalculationContainer>
  );
}
