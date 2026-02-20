import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PercentToHex from './percent-to-hex';

// Mock clipboard writeText
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('PercentToHex', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders PercentToHex component', () => {
    render(<PercentToHex />);
    expect(screen.getByText('Percent to Hex')).toBeInTheDocument();
    expect(screen.getByLabelText('Percent')).toBeInTheDocument();
    // The label text is "Hex" but the input is wrapped in it.
    // Testing library's getByLabelText should work if label wraps input.
    expect(screen.getByLabelText('Hex')).toBeInTheDocument();
    expect(screen.getByLabelText('Base 10')).toBeInTheDocument();
  });

  test('calculates hex from percent', () => {
    render(<PercentToHex />);
    const percentInput = screen.getByLabelText('Percent');
    fireEvent.change(percentInput, { target: { value: '50' } });

    // 50% of 255 is ~128. 128 in hex is 80.
    const hexInput = screen.getByLabelText('Hex');
    expect(hexInput).toHaveValue('80');
  });

  test('copies hex value to clipboard', async () => {
    render(<PercentToHex />);
    const percentInput = screen.getByLabelText('Percent');
    fireEvent.change(percentInput, { target: { value: '100' } }); // 100% -> FF

    const hexInput = screen.getByLabelText('Hex');
    expect(hexInput).toHaveValue('FF');

    // This button does not exist yet
    const copyButton = screen.getByText('Copy');
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('FF');

    // Check feedback
    expect(screen.getByText('Copied!')).toBeInTheDocument();

    // Wait for feedback to disappear
    await waitFor(() => {
      expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
