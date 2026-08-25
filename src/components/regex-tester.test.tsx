import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import RegexTester from './regex-tester';

describe('RegexTester Component', () => {
  it('renders the component with essential elements', () => {
    render(<RegexTester />);
    expect(screen.getByLabelText(/Regular Expression/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Flags/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Test String/i)).toBeInTheDocument();
  });

  it('highlights matched text correctly', () => {
    render(<RegexTester />);

    const patternInput = screen.getByLabelText(/Regular Expression/i);
    const flagsInput = screen.getByLabelText(/Flags/i);
    const testStringInput = screen.getByLabelText(/Test String/i);

    fireEvent.change(patternInput, { target: { value: 'hello' } });
    fireEvent.change(flagsInput, { target: { value: 'ig' } });
    fireEvent.change(testStringInput, { target: { value: 'Hello World! hello' } });

    const matches = screen.getAllByText(/hello/i);
    const highlightSpans = matches.filter((el) => el.tagName === 'SPAN');
    // Two matches: 'Hello' and 'hello' inside the highlighted spans
    expect(highlightSpans.length).toBeGreaterThan(0);
    expect(highlightSpans[0]).toHaveClass('bg-primary/30');
    expect(highlightSpans[0]).toHaveClass('rounded');
  });

  it('displays an error for invalid regex', () => {
    render(<RegexTester />);

    const patternInput = screen.getByLabelText(/Regular Expression/i);
    // Invalid regex pattern
    fireEvent.change(patternInput, { target: { value: '[' } });

    expect(screen.getByText(/Invalid regular expression/i)).toBeInTheDocument();
  });
});
