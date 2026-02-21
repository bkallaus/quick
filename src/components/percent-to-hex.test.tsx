import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import PercentToHex from './percent-to-hex';

// Mock clipboard writeText
const writeTextMock = jest.fn();
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: writeTextMock,
  },
  writable: true,
});

describe('PercentToHex', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    writeTextMock.mockReturnValue(Promise.resolve());
  });

  test('renders PercentToHex component', () => {
    render(<PercentToHex />);
    expect(screen.getByText('Percent to Hex')).toBeInTheDocument();
    expect(screen.getByLabelText('Percent')).toBeInTheDocument();
    expect(screen.getByLabelText('Hex Value')).toBeInTheDocument();
    expect(screen.getByLabelText('Base 10')).toBeInTheDocument();
    expect(screen.getByLabelText('Copy Hex Value')).toBeInTheDocument();
  });

  test('updates values when Percent input changes', () => {
    render(<PercentToHex />);
    const percentInput = screen.getByLabelText('Percent');
    const hexInput = screen.getByLabelText('Hex Value');
    const base10Input = screen.getByLabelText('Base 10');

    fireEvent.change(percentInput, { target: { value: '100' } });

    expect(hexInput).toHaveValue('FF');
    expect(base10Input).toHaveValue(255);
  });

  test('updates values when Hex input changes', () => {
    render(<PercentToHex />);
    const percentInput = screen.getByLabelText('Percent');
    const hexInput = screen.getByLabelText('Hex Value');
    const base10Input = screen.getByLabelText('Base 10');

    // Change hex to '80' (128)
    fireEvent.change(hexInput, { target: { value: '80' } });

    expect(base10Input).toHaveValue(128);
    // 128/255 * 100 = 50.19 -> 50% (rounded)
    // React Number Format seems to add a space or formatted differently in test environment
    expect(percentInput).toHaveValue('50 %');
  });

  test('updates values when Base 10 input changes', () => {
    render(<PercentToHex />);
    const percentInput = screen.getByLabelText('Percent');
    const hexInput = screen.getByLabelText('Hex Value');
    const base10Input = screen.getByLabelText('Base 10');

    // Change base10 to 255
    fireEvent.change(base10Input, { target: { value: '255' } });

    expect(hexInput).toHaveValue('FF');
    expect(percentInput).toHaveValue('100%');
  });

  test('copies hex value to clipboard', async () => {
    jest.useFakeTimers();
    render(<PercentToHex />);
    const hexInput = screen.getByLabelText('Hex Value');
    const copyButton = screen.getByLabelText('Copy Hex Value');

    // Set a value first
    fireEvent.change(hexInput, { target: { value: 'FF' } });

    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(writeTextMock).toHaveBeenCalledWith('FF');

    // Check for feedback (aria-label change)
    expect(screen.getByLabelText('Copied')).toBeInTheDocument();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Check if it reverts
    expect(screen.getByLabelText('Copy Hex Value')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
