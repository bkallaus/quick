import React, { useState, useMemo } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import Container from './container';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');

  const { regex, error, matches } = useMemo(() => {
    if (!pattern) return { regex: null, error: null, matches: [] };
    try {
      const re = new RegExp(pattern, flags);
      const matches = [];
      let match;
      if (re.global) {
        while ((match = re.exec(testString)) !== null) {
          matches.push(match);
          if (match[0] === '') re.lastIndex++; // Prevent infinite loops with empty matches
        }
      } else {
        match = re.exec(testString);
        if (match) matches.push(match);
      }
      return { regex: re, error: null, matches };
    } catch (err: any) {
      return { regex: null, error: err.message, matches: [] };
    }
  }, [pattern, flags, testString]);

  const renderHighlightedText = () => {
    if (!regex || error || matches.length === 0) {
      return testString || <span className="text-muted-foreground italic">No matches yet.</span>;
    }

    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

    matches.forEach((match, i) => {
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;

      // Text before match
      if (startIndex > lastIndex) {
        elements.push(<span key={`text-${i}`}>{testString.slice(lastIndex, startIndex)}</span>);
      }

      // Matched text
      if (match[0].length > 0) {
        elements.push(
          <span key={`match-${i}`} className="bg-primary/30 rounded px-[2px] font-mono font-medium">
            {match[0]}
          </span>
        );
      } else {
         // Handle zero-length matches safely if needed
         elements.push(<span key={`match-${i}`} className="border-l-2 border-primary/50 h-full inline-block" />);
      }

      lastIndex = endIndex;
    });

    // Remaining text after last match
    if (lastIndex < testString.length) {
      elements.push(<span key="text-end">{testString.slice(lastIndex)}</span>);
    }

    return elements;
  };

  return (
    <Container>
      <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold">Regex Tester</h2>

        <div className="grid gap-4 md:grid-cols-[1fr_100px]">
          <div className="flex flex-col gap-2">
            <Label htmlFor="pattern">Regular Expression</Label>
            <Input
              id="pattern"
              placeholder="e.g. ^[a-z]+$"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="font-mono text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="flags">Flags</Label>
            <Input
              id="flags"
              placeholder="e.g. ig"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="font-mono text-base"
            />
          </div>
        </div>

        {error && (
          <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md border border-destructive/20">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="testString">Test String</Label>
          <Textarea
            id="testString"
            placeholder="Enter text to test your regex against..."
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="font-mono text-base min-h-[150px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Match Result ({matches.length} {matches.length === 1 ? 'match' : 'matches'})</Label>
          <div className="min-h-[150px] w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-base ring-offset-background font-mono whitespace-pre-wrap break-words">
            {renderHighlightedText()}
          </div>
        </div>
      </div>
    </Container>
  );
}
