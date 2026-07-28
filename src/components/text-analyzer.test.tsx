import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextAnalyzer from './text-analyzer';

describe('TextAnalyzer', () => {
  it('renders correctly', () => {
    render(<TextAnalyzer />);
    expect(screen.getByText('Text Analyzer')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text here...')).toBeInTheDocument();
  });

  it('calculates characters, words, and lines correctly', () => {
    render(<TextAnalyzer />);
    const textarea = screen.getByPlaceholderText('Enter text here...');

    fireEvent.change(textarea, { target: { value: 'Hello world\nThis is a test' } });

    expect(screen.getByTestId('char-count')).toHaveTextContent('26');
    expect(screen.getByTestId('word-count')).toHaveTextContent('6');
    expect(screen.getByTestId('line-count')).toHaveTextContent('2');
  });

  it('handles empty input', () => {
    render(<TextAnalyzer />);

    expect(screen.getByTestId('char-count')).toHaveTextContent('0');
    expect(screen.getByTestId('word-count')).toHaveTextContent('0');
    expect(screen.getByTestId('line-count')).toHaveTextContent('0');
  });

  it('handles whitespace only input', () => {
    render(<TextAnalyzer />);
    const textarea = screen.getByPlaceholderText('Enter text here...');

    fireEvent.change(textarea, { target: { value: '   \n  \t ' } });

    expect(screen.getByTestId('char-count')).toHaveTextContent('8');
    expect(screen.getByTestId('word-count')).toHaveTextContent('0');
    expect(screen.getByTestId('line-count')).toHaveTextContent('2');
  });
});
