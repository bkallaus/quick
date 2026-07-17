import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JsonFormatter from './json-formatter';

describe('JsonFormatter', () => {
  test('renders component properly', () => {
    render(<JsonFormatter />);
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter JSON here...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Formatted JSON will appear here...')).toBeInTheDocument();
  });

  test('formats valid JSON', () => {
    render(<JsonFormatter />);
    const inputArea = screen.getByPlaceholderText('Enter JSON here...');
    const formattedArea = screen.getByPlaceholderText('Formatted JSON will appear here...');

    fireEvent.change(inputArea, { target: { value: '{"hello":"world"}' } });

    expect(formattedArea).toHaveValue('{\n  "hello": "world"\n}');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('displays error on invalid JSON', () => {
    render(<JsonFormatter />);
    const inputArea = screen.getByPlaceholderText('Enter JSON here...');

    fireEvent.change(inputArea, { target: { value: '{"hello":"world"' } });

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid JSON');
  });

  test('clears output and error when input is empty', () => {
    render(<JsonFormatter />);
    const inputArea = screen.getByPlaceholderText('Enter JSON here...');
    const formattedArea = screen.getByPlaceholderText('Formatted JSON will appear here...');

    fireEvent.change(inputArea, { target: { value: '{"hello":"world"' } });
    expect(screen.getByRole('alert')).toBeInTheDocument();

    fireEvent.change(inputArea, { target: { value: '' } });

    expect(formattedArea).toHaveValue('');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
