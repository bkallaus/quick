import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Quick Calculations heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Quick Calculations/i);
  expect(headingElement).toBeInTheDocument();
});
