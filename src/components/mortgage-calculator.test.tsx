import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MortgageCalculator from './mortgage-calculator';

describe('MortgageCalculator', () => {
  it('renders correctly with default values', () => {
    render(<MortgageCalculator />);

    // Check inputs
    expect(screen.getByLabelText(/Loan Amount/i)).toHaveValue(300000);
    expect(screen.getByLabelText(/Annual Interest Rate/i)).toHaveValue(5);
    expect(screen.getByLabelText(/Loan Term/i)).toHaveValue(30);

    // Check outputs (300k, 5%, 30yr = $1610.46)
    expect(screen.getByText('$1,610.46')).toBeInTheDocument();
    expect(screen.getByText('$279,767.35')).toBeInTheDocument();
    expect(screen.getByText('$579,767.35')).toBeInTheDocument();
  });

  it('updates calculation when inputs change', () => {
    render(<MortgageCalculator />);

    const principalInput = screen.getByLabelText(/Loan Amount/i);
    fireEvent.change(principalInput, { target: { value: '200000' } });

    // Output for 200k, 5%, 30yr = $1073.64
    expect(screen.getByText('$1,073.64')).toBeInTheDocument();
  });

  it('handles empty or zero inputs gracefully', () => {
    render(<MortgageCalculator />);

    const principalInput = screen.getByLabelText(/Loan Amount/i);
    fireEvent.change(principalInput, { target: { value: '' } });

    // Outputs should be zeroed or handled
    const zeroResults = screen.getAllByText('$0.00');
    expect(zeroResults.length).toBeGreaterThan(0);
  });
});
