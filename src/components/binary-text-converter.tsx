import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import Container from './container';

type Mode = 'textToBinary' | 'binaryToText';

export default function BinaryTextConverter() {
  const [mode, setMode] = useState<Mode>('textToBinary');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setError(null);
    if (!input) {
      setOutput('');
      return;
    }

    if (mode === 'textToBinary') {
      try {
        const textEncoder = new TextEncoder();
        const bytes = textEncoder.encode(input);
        const binaryArray = Array.from(bytes).map(byte =>
          byte.toString(2).padStart(8, '0')
        );
        setOutput(binaryArray.join(' '));
      } catch (e) {
        setError('Failed to convert text to binary.');
        setOutput('');
      }
    } else {
      try {
        // Allow multiple spaces and newlines by splitting on whitespace
        const binaryStrings = input.trim().split(/\s+/);

        // Validate that all strings are binary
        const isValid = binaryStrings.every(str => /^[01]+$/.test(str));
        if (!isValid) {
          setError('Input must contain only 0s, 1s, and whitespace.');
          setOutput('');
          return;
        }

        const uint8Array = new Uint8Array(binaryStrings.length);
        for (let i = 0; i < binaryStrings.length; i++) {
          const num = parseInt(binaryStrings[i], 2);
          if (isNaN(num) || num > 255) {
             throw new Error("Invalid byte value");
          }
          uint8Array[i] = num;
        }

        const textDecoder = new TextDecoder('utf-8', { fatal: true });
        setOutput(textDecoder.decode(uint8Array));
      } catch (e) {
        setError('Invalid binary data. Please ensure it represents valid UTF-8 characters.');
        setOutput('');
      }
    }
  }, [input, mode]);

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleToggleMode = () => {
    setMode(prev => prev === 'textToBinary' ? 'binaryToText' : 'textToBinary');
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <Container>
      <div className="w-full flex flex-col gap-6" id="binary-text-converter">
        <Card>
          <CardHeader>
            <CardTitle>Binary Text Converter</CardTitle>
            <CardDescription>
              Convert text to binary or binary back to text (UTF-8).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
               <Button
                variant="outline"
                onClick={handleToggleMode}
                className="gap-2"
                aria-label="Toggle mode"
              >
                <ArrowLeftRight className="h-4 w-4" />
                {mode === 'textToBinary' ? 'Text to Binary' : 'Binary to Text'}
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="input-text">
                {mode === 'textToBinary' ? 'Text Input' : 'Binary Input (0s and 1s)'}
              </Label>
              <Textarea
                id="input-text"
                placeholder={mode === 'textToBinary' ? 'Enter text here...' : 'Enter binary data separated by spaces...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px] font-mono"
              />
            </div>

            <div className="space-y-2 relative">
              <div className="flex justify-between items-end">
                <Label htmlFor="output-text">
                  {mode === 'textToBinary' ? 'Binary Output' : 'Text Output'}
                </Label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  disabled={!output}
                  className="h-8 gap-1"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <Textarea
                id="output-text"
                readOnly
                value={output}
                placeholder="Result will appear here..."
                className="min-h-[120px] font-mono bg-muted/50"
              />
              {error && (
                <p className="text-sm font-medium text-destructive mt-2" role="alert">
                  {error}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
