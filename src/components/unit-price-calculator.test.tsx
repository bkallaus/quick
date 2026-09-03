import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UnitPriceCalculator from './unit-price-calculator';
import React from 'react';

describe('UnitPriceCalculator', () => {
  test('renders the component with inputs', () => {
    render(<UnitPriceCalculator />);
    expect(screen.getByText('Unit Price Calculator')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Item A' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Item B' })).toBeInTheDocument();
  });

  test('calculates unit prices correctly', () => {
    render(<UnitPriceCalculator />);

    // Get all inputs
    const priceInputs = screen.getAllByLabelText('Price ($)');
    const sizeInputs = screen.getAllByLabelText('Size (Quantity)');

    // Item A
    fireEvent.change(priceInputs[0], { target: { value: '5.00' } });
    fireEvent.change(sizeInputs[0], { target: { value: '10' } });

    // Item B
    fireEvent.change(priceInputs[1], { target: { value: '3.00' } });
    fireEvent.change(sizeInputs[1], { target: { value: '5' } });

    expect(screen.getByTestId('item-a-unit')).toHaveTextContent('$0.5000');
    expect(screen.getByTestId('item-b-unit')).toHaveTextContent('$0.6000');

    // A should be better
    expect(screen.getByTestId('best-deal')).toHaveTextContent('Item A is the better deal');
  });

  test('identifies same deal', () => {
    render(<UnitPriceCalculator />);

    const priceInputs = screen.getAllByLabelText('Price ($)');
    const sizeInputs = screen.getAllByLabelText('Size (Quantity)');

    fireEvent.change(priceInputs[0], { target: { value: '5.00' } });
    fireEvent.change(sizeInputs[0], { target: { value: '10' } });

    fireEvent.change(priceInputs[1], { target: { value: '2.50' } });
    fireEvent.change(sizeInputs[1], { target: { value: '5' } });

    expect(screen.getByTestId('best-deal')).toHaveTextContent('Both items have the same unit price');
  });

  test('does not show best deal if incomplete', () => {
    render(<UnitPriceCalculator />);

    const priceInputs = screen.getAllByLabelText('Price ($)');
    const sizeInputs = screen.getAllByLabelText('Size (Quantity)');

    fireEvent.change(priceInputs[0], { target: { value: '5.00' } });
    fireEvent.change(sizeInputs[0], { target: { value: '10' } });

    fireEvent.change(priceInputs[1], { target: { value: '3.00' } });

    expect(screen.queryByTestId('best-deal')).not.toBeInTheDocument();
  });
});
