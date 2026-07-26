import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordGenerator from './password-generator';

describe('PasswordGenerator', () => {
  beforeEach(() => {
    // Mock crypto to ensure consistent behavior in tests if needed
    // However, the component falls back to Math.random() if window.crypto is absent.
    // Jest's JSDOM usually lacks crypto.getRandomValues, so it falls back to Math.random.
    // We mock it for explicit control if we want to test that branch.
    // For simplicity, we just test the resulting length and character composition.
  });

  test('renders generator UI', () => {
    render(<PasswordGenerator />);
    expect(screen.getByText('Password Generator')).toBeInTheDocument();
    expect(screen.getByLabelText('Length')).toBeInTheDocument();
    expect(screen.getByLabelText('Uppercase')).toBeInTheDocument();
    expect(screen.getByLabelText('Lowercase')).toBeInTheDocument();
    expect(screen.getByLabelText('Numbers')).toBeInTheDocument();
    expect(screen.getByLabelText('Symbols')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate Password' })).toBeInTheDocument();
    expect(screen.getByLabelText('Generated Password')).toBeInTheDocument();
  });

  test('generates password with default length 16', () => {
    render(<PasswordGenerator />);
    const button = screen.getByRole('button', { name: 'Generate Password' });
    fireEvent.click(button);

    const output = screen.getByLabelText('Generated Password') as HTMLInputElement;
    expect(output.value).toHaveLength(16);
  });

  test('updates length when input changes', () => {
    render(<PasswordGenerator />);
    const lengthInput = screen.getByLabelText('Length');
    fireEvent.change(lengthInput, { target: { value: '8' } });

    const button = screen.getByRole('button', { name: 'Generate Password' });
    fireEvent.click(button);

    const output = screen.getByLabelText('Generated Password') as HTMLInputElement;
    expect(output.value).toHaveLength(8);
  });

  test('generates empty password when no options are selected', () => {
    render(<PasswordGenerator />);

    const uppercase = screen.getByLabelText('Uppercase');
    const lowercase = screen.getByLabelText('Lowercase');
    const numbers = screen.getByLabelText('Numbers');
    const symbols = screen.getByLabelText('Symbols');

    fireEvent.click(uppercase);
    fireEvent.click(lowercase);
    fireEvent.click(numbers);
    fireEvent.click(symbols);

    const button = screen.getByRole('button', { name: 'Generate Password' });
    fireEvent.click(button);

    const output = screen.getByLabelText('Generated Password') as HTMLInputElement;
    expect(output.value).toBe('');
  });
});
