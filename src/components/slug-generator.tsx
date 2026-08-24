import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Container from './container';
import { Copy, Check } from 'lucide-react';

const SlugGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
  };

  const slug = slugify(inputText);

  const handleCopy = async () => {
    if (slug) {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Container>
      <h2 className="text-xl font-bold mb-4">Slug Generator</h2>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slug-input">Text to Slugify</Label>
            <Input
              id="slug-input"
              type="text"
              placeholder="Enter text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug-output">Generated Slug</Label>
            <div className="flex gap-2">
              <Input
                id="slug-output"
                type="text"
                readOnly
                value={slug}
                className="bg-muted"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                disabled={!slug}
                title="Copy slug"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SlugGenerator;
