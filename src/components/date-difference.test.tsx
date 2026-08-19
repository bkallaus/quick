import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DateDifference from './date-difference';

describe('DateDifference', () => {
  it('renders correctly with initial state without results', () => {
    render(<DateDifference />);

    expect(screen.getByText('Date Difference')).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();

    // Results shouldn't be rendered yet
    expect(screen.queryByText(/Days/i, { selector: 'span' })).not.toBeInTheDocument();
  });

  it('calculates counts correctly for a basic year span', () => {
    render(<DateDifference />);

    const startInput = screen.getByLabelText(/Start Date/i);
    const endInput = screen.getByLabelText(/End Date/i);

    fireEvent.change(startInput, { target: { value: '2023-01-01' } });
    fireEvent.change(endInput, { target: { value: '2024-01-01' } });

    // Leap year math causes 365 days, ~52.1 weeks, ~12 months, 1 year
    expect(screen.getByText('Days')).toBeInTheDocument();

    // Exact text matching for our expected numeric results
    expect(screen.getByText('365')).toBeInTheDocument(); // Days
    expect(screen.getByText('52.1')).toBeInTheDocument(); // Weeks
    expect(screen.getByText('12')).toBeInTheDocument(); // Months
    expect(screen.getByText('1')).toBeInTheDocument(); // Years
  });

  it('calculates the absolute difference regardless of date order', () => {
    render(<DateDifference />);

    const startInput = screen.getByLabelText(/Start Date/i);
    const endInput = screen.getByLabelText(/End Date/i);

    // End is before Start
    fireEvent.change(startInput, { target: { value: '2024-01-01' } });
    fireEvent.change(endInput, { target: { value: '2023-01-01' } });

    expect(screen.getByText('365')).toBeInTheDocument();
  });
});
