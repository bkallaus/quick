import React, { useState, useEffect } from "react";
import CalculationContainer from "./container";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Copy, Check } from "lucide-react";

function parseCSV(text: string, delimiter = ','): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === delimiter) {
        row.push(current.trim());
        current = '';
      } else if (char === '\n') {
        row.push(current.trim());
        result.push(row);
        row = [];
        current = '';
      } else if (char !== '\r') {
        current += char;
      }
    }
  }
  row.push(current.trim());
  result.push(row);
  return result.filter(r => r.length > 0 && r.some(c => c !== ''));
}

function generateMarkdown(rows: string[][], hasHeader: boolean): string {
  if (rows.length === 0) return '';

  let header: string[] = [];
  let body: string[][] = [];

  if (hasHeader) {
    header = rows[0];
    body = rows.slice(1);
  } else {
    // Generate dummy headers if no header row is provided
    header = Array(Math.max(...rows.map(r => r.length))).fill(0).map((_, i) => `Column ${i + 1}`);
    body = rows;
  }

  // Pad shorter rows to match header length
  const numCols = header.length;
  body = body.map(row => {
    const padded = [...row];
    while (padded.length < numCols) padded.push('');
    return padded.slice(0, numCols);
  });

  const separator = header.map(() => '---');

  const escapePipe = (str: string) => str.replace(/\|/g, '\\|');

  let md = `| ${header.map(escapePipe).join(' | ')} |\n`;
  md += `| ${separator.join(' | ')} |\n`;
  for (const row of body) {
    md += `| ${row.map(escapePipe).join(' | ')} |\n`;
  }

  return md.trim();
}

const CsvToMarkdown = () => {
  const [csvInput, setCsvInput] = useState("Name,Age,Role\nAlice,30,Engineer\nBob,25,Designer");
  const [markdownOutput, setMarkdownOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeader, setHasHeader] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const rows = parseCSV(csvInput, delimiter);
      if (rows.length > 0) {
        setMarkdownOutput(generateMarkdown(rows, hasHeader));
      } else {
        setMarkdownOutput("");
      }
    } catch (e) {
      setMarkdownOutput("Error parsing CSV");
    }
  }, [csvInput, delimiter, hasHeader]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculationContainer>
      <h4 className="w-full text-center mb-0 text-xl font-semibold">CSV to Markdown</h4>
      <div className="w-full flex flex-col gap-6 mt-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-2">
            <Label htmlFor="delimiter-select">Delimiter:</Label>
            <Select value={delimiter} onValueChange={setDelimiter}>
              <SelectTrigger id="delimiter-select" className="w-[120px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=",">Comma</SelectItem>
                <SelectItem value=";">Semicolon</SelectItem>
                <SelectItem value="\t">Tab</SelectItem>
                <SelectItem value="|">Pipe</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="has-header"
              checked={hasHeader}
              onCheckedChange={(checked) => setHasHeader(checked as boolean)}
            />
            <Label htmlFor="has-header" className="cursor-pointer">First row is header</Label>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="csv-input">CSV Input</Label>
            <Textarea
              id="csv-input"
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
              placeholder="Paste your CSV here..."
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <div className="flex justify-between items-end">
              <Label htmlFor="markdown-output">Markdown Output</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-8 flex items-center gap-1"
                disabled={!markdownOutput}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <Textarea
              id="markdown-output"
              value={markdownOutput}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-muted/50"
              placeholder="Markdown output will appear here..."
            />
          </div>
        </div>
      </div>
    </CalculationContainer>
  );
};

export default CsvToMarkdown;
