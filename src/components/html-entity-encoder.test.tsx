import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HtmlEntityEncoder from './html-entity-encoder';

describe('HtmlEntityEncoder', () => {
  it('renders correctly', () => {
    render(<HtmlEntityEncoder />);
    expect(screen.getByRole('heading', { name: /html entity encoder \/ decoder/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/input text/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/output/i)).toBeInTheDocument();
  });

  it('encodes HTML entities correctly', () => {
    render(<HtmlEntityEncoder />);
    const input = screen.getByLabelText(/input text/i);
    const encodeBtn = screen.getByRole('button', { name: /encode/i });
    const output = screen.getByLabelText(/output/i);

    fireEvent.change(input, { target: { value: '<div>Test & Demo</div>' } });
    fireEvent.click(encodeBtn);

    expect(output).toHaveValue('&#60;div&#62;Test &#38; Demo&#60;/div&#62;');
  });

  it('decodes HTML entities correctly', () => {
    render(<HtmlEntityEncoder />);
    const input = screen.getByLabelText(/input text/i);
    const decodeBtn = screen.getByRole('button', { name: /decode/i });
    const output = screen.getByLabelText(/output/i);

    fireEvent.change(input, { target: { value: '&#60;div&#62;Test &#38; Demo&#60;/div&#62; &copy;' } });
    fireEvent.click(decodeBtn);

    expect(output).toHaveValue('<div>Test & Demo</div> ©');
  });
});
