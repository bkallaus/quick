import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProportionCalculator from './proportion-calculator';
import "@testing-library/jest-dom";

describe('ProportionCalculator', () => {
  it('renders correctly', () => {
    render(<ProportionCalculator />);
    expect(screen.getByText('Proportion Calculator')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('A')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('B')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('C')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('X')).toBeInTheDocument();
  });

  it('calculates X correctly (A/B = C/X)', () => {
    render(<ProportionCalculator />);
    fireEvent.change(screen.getByPlaceholderText('A'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('B'), { target: { value: '4' } });
    fireEvent.change(screen.getByPlaceholderText('C'), { target: { value: '3' } });

    fireEvent.click(screen.getByText('Calculate'));

    expect(screen.getByPlaceholderText('X')).toHaveValue(6);
  });

  it('calculates A correctly (A/B = C/X)', () => {
    render(<ProportionCalculator />);
    fireEvent.change(screen.getByPlaceholderText('B'), { target: { value: '4' } });
    fireEvent.change(screen.getByPlaceholderText('C'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('X'), { target: { value: '6' } });

    fireEvent.click(screen.getByText('Calculate'));

    expect(screen.getByPlaceholderText('A')).toHaveValue(2);
  });

  it('calculates B correctly (A/B = C/X)', () => {
    render(<ProportionCalculator />);
    fireEvent.change(screen.getByPlaceholderText('A'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('C'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('X'), { target: { value: '6' } });

    fireEvent.click(screen.getByText('Calculate'));

    expect(screen.getByPlaceholderText('B')).toHaveValue(4);
  });

  it('calculates C correctly (A/B = C/X)', () => {
    render(<ProportionCalculator />);
    fireEvent.change(screen.getByPlaceholderText('A'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('B'), { target: { value: '4' } });
    fireEvent.change(screen.getByPlaceholderText('X'), { target: { value: '6' } });

    fireEvent.click(screen.getByText('Calculate'));

    expect(screen.getByPlaceholderText('C')).toHaveValue(3);
  });

  it('alerts if not exactly 3 values are provided', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<ProportionCalculator />);

    fireEvent.change(screen.getByPlaceholderText('A'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('B'), { target: { value: '4' } });
    // Only 2 values provided

    fireEvent.click(screen.getByText('Calculate'));

    expect(alertMock).toHaveBeenCalledWith('Please enter exactly 3 values to calculate the 4th.');
    alertMock.mockRestore();
  });

  it('clears fields when Clear button is clicked', () => {
    render(<ProportionCalculator />);

    const inputA = screen.getByPlaceholderText('A');
    fireEvent.change(inputA, { target: { value: '2' } });
    expect(inputA).toHaveValue(2);

    fireEvent.click(screen.getByText('Clear'));

    expect(inputA).toHaveValue(null);
  });
});
