import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CsvToMarkdown from './csv-to-markdown';

// Mock matchMedia for Radix UI
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || 'mouse';
  }
}
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();

describe('CsvToMarkdown', () => {
  let writeTextMock: any;
  beforeEach(() => {
    writeTextMock = vi.fn().mockImplementation(() => Promise.resolve());
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock }
    });
  });

  test('renders the component with default text', () => {
    render(<CsvToMarkdown />);
    expect(screen.getByText('CSV to Markdown')).toBeInTheDocument();

    const csvInput = screen.getByLabelText(/CSV Input/i) as HTMLTextAreaElement;
    expect(csvInput.value).toContain('Name,Age,Role');

    const mdOutput = screen.getByLabelText(/Markdown Output/i) as HTMLTextAreaElement;
    expect(mdOutput.value).toContain('| Name | Age | Role |');
    expect(mdOutput.value).toContain('| --- | --- | --- |');
    expect(mdOutput.value).toContain('| Alice | 30 | Engineer |');
  });

  test('updates markdown output when CSV input changes', async () => {
    render(<CsvToMarkdown />);
    const csvInput = screen.getByLabelText(/CSV Input/i);
    fireEvent.change(csvInput, { target: { value: 'Fruit,Color\nApple,Red\nBanana,Yellow' } });

    const mdOutput = screen.getByLabelText(/Markdown Output/i) as HTMLTextAreaElement;
    expect(mdOutput.value).toContain('| Fruit | Color |');
    expect(mdOutput.value).toContain('| --- | --- |');
    expect(mdOutput.value).toContain('| Apple | Red |');
    expect(mdOutput.value).toContain('| Banana | Yellow |');
  });

  test('handles unquoted commas correctly', async () => {
    render(<CsvToMarkdown />);
    const csvInput = screen.getByLabelText(/CSV Input/i);
    fireEvent.change(csvInput, { target: { value: 'A,B\n1,2\n3,4' } });

    const mdOutput = screen.getByLabelText(/Markdown Output/i) as HTMLTextAreaElement;
    expect(mdOutput.value).toContain('| A | B |');
    expect(mdOutput.value).toContain('| 1 | 2 |');
  });

  test('handles quotes correctly in CSV', async () => {
    render(<CsvToMarkdown />);
    const csvInput = screen.getByLabelText(/CSV Input/i);
    fireEvent.change(csvInput, { target: { value: 'Col1,Col2\n"A, B","C"\n"He said ""Hi""",D' } });

    const mdOutput = screen.getByLabelText(/Markdown Output/i) as HTMLTextAreaElement;
    expect(mdOutput.value).toContain('| Col1 | Col2 |');
    expect(mdOutput.value).toContain('| A, B | C |');
    expect(mdOutput.value).toContain('| He said "Hi" | D |');
  });

  test('escapes pipes in markdown output', async () => {
    render(<CsvToMarkdown />);
    const csvInput = screen.getByLabelText(/CSV Input/i);
    fireEvent.change(csvInput, { target: { value: 'Col1,Col2\nA|B,C' } });

    const mdOutput = screen.getByLabelText(/Markdown Output/i) as HTMLTextAreaElement;
    expect(mdOutput.value).toContain('| Col1 | Col2 |');
    expect(mdOutput.value).toContain('| A\\|B | C |');
  });

  test('copies markdown to clipboard', async () => {
    render(<CsvToMarkdown />);
    const copyButton = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyButton);
    expect(writeTextMock).toHaveBeenCalled();
  });
});
