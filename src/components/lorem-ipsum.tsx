import React, { useState } from 'react';

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
  "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis",
  "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum",
  "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non",
  "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

const generateSentence = () => {
  const numWords = Math.floor(Math.random() * 10) + 5; // 5-15 words
  const words = Array.from({ length: numWords }, getRandomWord);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
};

const generateParagraph = () => {
  const numSentences = Math.floor(Math.random() * 4) + 3; // 3-7 sentences
  return Array.from({ length: numSentences }, generateSentence).join(" ");
};

const LoremIpsum = () => {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [text, setText] = useState<string>("");

  const handleGenerate = () => {
    const newText = Array.from({ length: paragraphs }, generateParagraph).join("\n\n");
    setText(newText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <article id="lorem-ipsum-generator">
      <header>
        <h2>Lorem Ipsum Generator</h2>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="paragraphs-input" style={{ marginBottom: 0 }}>Paragraphs:</label>
          <input
            id="paragraphs-input"
            type="number"
            min="1"
            max="10"
            value={paragraphs}
            onChange={(e) => setParagraphs(Number(e.target.value))}
            style={{ width: '80px', marginBottom: 0 }}
          />
          <button onClick={handleGenerate} style={{ width: 'auto', marginBottom: 0 }}>Generate</button>
        </div>

        {text && (
          <div style={{ position: 'relative' }}>
            <textarea
              readOnly
              value={text}
              rows={10}
              style={{ marginBottom: '0.5rem', width: '100%', resize: 'vertical' }}
              aria-label="Generated lorem ipsum text"
            />
            <button
              onClick={handleCopy}
              className="outline"
              style={{ width: 'auto', position: 'absolute', top: '10px', right: '10px' }}
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default LoremIpsum;
