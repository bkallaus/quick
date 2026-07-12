import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DiscountCalculator from './discount-calculator';

describe('DiscountCalculator', () => {
  it('calculates the final price and savings correctly', async () => {
    render(<DiscountCalculator />);

    const user = userEvent.setup();

    // Default state check
    expect(screen.getByText(/\$80.00/)).toBeInTheDocument(); // Final Price
    expect(screen.getByText(/\$20.00/)).toBeInTheDocument(); // Savings

    const originalPriceInput = screen.getByLabelText(/Original Price/);
    const discountPercentInput = screen.getByLabelText(/Discount %/);

    // Update original price to $200
    await user.clear(originalPriceInput);
    await user.type(originalPriceInput, '200');

    expect(screen.getByText(/\$160.00/)).toBeInTheDocument(); // Final Price
    expect(screen.getByText(/\$40.00/)).toBeInTheDocument(); // Savings

    // Update discount to 50%
    await user.clear(discountPercentInput);
    await user.type(discountPercentInput, '50');

    const elements = screen.getAllByText(/\$100.00/);
    expect(elements).toHaveLength(2); // Final Price and Savings
  });
});
