import { Copy } from 'lucide-react';
import { useState } from 'react';
import Container from './container';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export default function MetaTagsGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    const tags = [];

    if (title) {
      tags.push(`<!-- Primary Meta Tags -->`);
      tags.push(`<title>${title}</title>`);
      tags.push(`<meta name="title" content="${title}" />`);
    }

    if (description) {
      tags.push(`<meta name="description" content="${description}" />`);
    }

    if (title || description || imageUrl) {
      tags.push(`\n<!-- Open Graph / Facebook -->`);
      tags.push(`<meta property="og:type" content="website" />`);
      if (title) tags.push(`<meta property="og:title" content="${title}" />`);
      if (description) tags.push(`<meta property="og:description" content="${description}" />`);
      if (imageUrl) tags.push(`<meta property="og:image" content="${imageUrl}" />`);

      tags.push(`\n<!-- Twitter -->`);
      tags.push(`<meta property="twitter:card" content="summary_large_image" />`);
      if (title) tags.push(`<meta property="twitter:title" content="${title}" />`);
      if (description) tags.push(`<meta property="twitter:description" content="${description}" />`);
      if (imageUrl) tags.push(`<meta property="twitter:image" content="${imageUrl}" />`);
    }

    return tags.join('\n');
  };

  const output = generateMetaTags();

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <Container>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Meta Tags Generator</h2>
          <p className="text-muted-foreground">
            Generate standard HTML, Open Graph, and Twitter meta tags for your web pages.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Page Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Page Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the page..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.png"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Generated Tags</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!output}
                aria-label="Copy to clipboard"
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value={output}
                placeholder="Meta tags will appear here..."
                className="font-mono text-sm min-h-[300px] bg-muted"
                aria-label="Generated Meta Tags"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
