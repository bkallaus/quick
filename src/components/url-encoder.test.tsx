import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UrlEncoder from './url-encoder';

describe('UrlEncoder', () => {
  it('renders correctly', () => {
    render(<UrlEncoder />);
    expect(screen.getByText('URL Encoder/Decoder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter plain text...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter URL encoded text...')).toBeInTheDocument();
  });

  it('encodes plain text correctly', () => {
    render(<UrlEncoder />);
    const plainInput = screen.getByPlaceholderText('Enter plain text...');
    const encodedInput = screen.getByPlaceholderText('Enter URL encoded text...');

    fireEvent.change(plainInput, { target: { value: 'hello world?' } });

    expect(encodedInput).toHaveValue('hello%20world%3F');
  });

  it('decodes encoded text correctly', () => {
    render(<UrlEncoder />);
    const plainInput = screen.getByPlaceholderText('Enter plain text...');
    const encodedInput = screen.getByPlaceholderText('Enter URL encoded text...');

    fireEvent.change(encodedInput, { target: { value: 'hello%20world%3F' } });

    expect(plainInput).toHaveValue('hello world?');
  });

  it('shows an error for invalid URL encoding', () => {
    render(<UrlEncoder />);
    const encodedInput = screen.getByPlaceholderText('Enter URL encoded text...');

    fireEvent.change(encodedInput, { target: { value: '%E0%A4%A' } }); // Invalid encoding

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to decode: invalid URL encoding.');
  });

  it('clears error on valid input', () => {
    render(<UrlEncoder />);
    const encodedInput = screen.getByPlaceholderText('Enter URL encoded text...');

    fireEvent.change(encodedInput, { target: { value: '%E0%A4%A' } }); // Invalid
    expect(screen.getByRole('alert')).toBeInTheDocument();

    fireEvent.change(encodedInput, { target: { value: 'valid' } }); // Valid
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
