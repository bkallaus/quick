import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextAnalyzer from './text-analyzer';

describe('TextAnalyzer Component', () => {
  test('renders with initial 0 count', () => {
    render(<TextAnalyzer />);

    expect(screen.getByText('Text Analyzer')).toBeInTheDocument();
    expect(screen.getByText('Words:')).toBeInTheDocument();
    expect(screen.getByText('Characters:')).toBeInTheDocument();

    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBe(2);
  });

  test('correctly counts words and characters for normal text', () => {
    render(<TextAnalyzer />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello world! This is a test.' } });

    // "Hello world! This is a test." -> 6 words, 28 characters
    expect(screen.getByText('6', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('28', { exact: false })).toBeInTheDocument();
  });

  test('handles multiple spaces correctly', () => {
    render(<TextAnalyzer />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '  Hello   world!  ' } });

    // "  Hello   world!  " -> 2 words, 18 characters
    expect(screen.getByText('2', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('18', { exact: false })).toBeInTheDocument();
  });

  test('handles empty text correctly', () => {
    render(<TextAnalyzer />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '   ' } }); // Just spaces

    // "   " -> 0 words, 3 characters
    expect(screen.getByText('3', { exact: false })).toBeInTheDocument();
  });
});
