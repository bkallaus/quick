import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IframeTester from './iframe-tester';

describe('IframeTester', () => {
  test('renders input and load button', () => {
    render(<IframeTester />);

    expect(screen.getByLabelText(/Iframe URL/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Load/i })).toBeInTheDocument();
  });

  test('loads iframe when url is entered and button is clicked', async () => {
    const user = userEvent.setup();
    render(<IframeTester />);

    const input = screen.getByLabelText(/Iframe URL/i);
    const button = screen.getByRole('button', { name: /Load/i });
    const testUrl = 'https://example.com';

    await user.type(input, testUrl);
    await user.click(button);

    const iframe = screen.getByTitle('Iframe Tester');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', testUrl);
  });
});
