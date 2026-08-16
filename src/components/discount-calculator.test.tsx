import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DiscountCalculator from './discount-calculator';

describe('DiscountCalculator', () => {
  it('renders default values correctly', () => {
    render(<DiscountCalculator />);

    expect(screen.getByText('Discount Calculator')).toBeInTheDocument();

    const originalPriceInput = screen.getByLabelText('Original Price');
    expect(originalPriceInput).toHaveValue('$100');

    const discountInput = screen.getByLabelText('Discount %');
    expect(discountInput).toHaveValue('20%');

    expect(screen.getByText('You Save').nextElementSibling).toHaveTextContent('$20.00');
    expect(screen.getByText('Final Price').nextElementSibling).toHaveTextContent('$80.00');
  });

  it('updates calculations when original price changes', async () => {
    const user = userEvent.setup();
    render(<DiscountCalculator />);

    const originalPriceInput = screen.getByLabelText('Original Price');
    await user.clear(originalPriceInput);
    await user.type(originalPriceInput, '50');

    expect(screen.getByText('You Save').nextElementSibling).toHaveTextContent('$10.00');
    expect(screen.getByText('Final Price').nextElementSibling).toHaveTextContent('$40.00');
  });

  it('updates calculations when discount percentage changes', async () => {
    const user = userEvent.setup();
    render(<DiscountCalculator />);

    const discountInput = screen.getByLabelText('Discount %');
    await user.clear(discountInput);
    await user.type(discountInput, '50');

    expect(screen.getByText('You Save').nextElementSibling).toHaveTextContent('$50.00');
    expect(screen.getByText('Final Price').nextElementSibling).toHaveTextContent('$50.00');
  });
});
