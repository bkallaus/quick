import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import BinaryTextConverter from './binary-text-converter';

describe('BinaryTextConverter', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  test('renders the component with text-to-binary mode by default', () => {
    render(<BinaryTextConverter />);
    expect(screen.getByText('Binary Text Converter')).toBeDefined();
    expect(screen.getByText('Text Input')).toBeDefined();
    expect(screen.getByText('Binary Output')).toBeDefined();
  });

  test('converts text to binary correctly', () => {
    render(<BinaryTextConverter />);
    const input = screen.getByLabelText('Text Input');
    fireEvent.change(input, { target: { value: 'Hi' } });

    // 'H' = 72 = 01001000
    // 'i' = 105 = 01101001
    const output = screen.getByLabelText('Binary Output') as HTMLTextAreaElement;
    expect(output.value).toBe('01001000 01101001');
  });

  test('toggles mode and converts binary to text correctly', () => {
    render(<BinaryTextConverter />);
    const toggleBtn = screen.getByRole('button', { name: 'Toggle mode' });
    fireEvent.click(toggleBtn);

    expect(screen.getByText('Binary Input (0s and 1s)')).toBeDefined();
    expect(screen.getByText('Text Output')).toBeDefined();

    const input = screen.getByLabelText('Binary Input (0s and 1s)');
    fireEvent.change(input, { target: { value: '01001000 01101001' } });

    const output = screen.getByLabelText('Text Output') as HTMLTextAreaElement;
    expect(output.value).toBe('Hi');
  });

  test('handles invalid binary input gracefully', () => {
    render(<BinaryTextConverter />);
    const toggleBtn = screen.getByRole('button', { name: 'Toggle mode' });
    fireEvent.click(toggleBtn);

    const input = screen.getByLabelText('Binary Input (0s and 1s)');
    fireEvent.change(input, { target: { value: '01001000 2' } });

    expect(screen.getByText('Input must contain only 0s, 1s, and whitespace.')).toBeDefined();
    const output = screen.getByLabelText('Text Output') as HTMLTextAreaElement;
    expect(output.value).toBe('');
  });

  test('copies output to clipboard', async () => {
    render(<BinaryTextConverter />);
    const input = screen.getByLabelText('Text Input');
    fireEvent.change(input, { target: { value: 'A' } }); // 01000001

    const copyBtn = screen.getByRole('button', { name: 'Copy' });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('01000001');
  });
});
