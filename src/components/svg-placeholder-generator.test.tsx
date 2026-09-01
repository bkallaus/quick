import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import SvgPlaceholderGenerator from './svg-placeholder-generator';

describe('SvgPlaceholderGenerator', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it('renders correctly with default values', () => {
    render(<SvgPlaceholderGenerator />);
    expect(screen.getByText('SVG Placeholder Generator')).toBeInTheDocument();

    // Check inputs
    expect(screen.getByLabelText('Width')).toHaveValue(800);
    expect(screen.getByLabelText('Height')).toHaveValue(600);
    expect(screen.getByLabelText('Background Color')).toHaveValue('#cccccc');
    expect(screen.getByLabelText('Text Color')).toHaveValue('#333333');
    expect(screen.getByLabelText('Text')).toHaveValue('800x600');
  });

  it('updates SVG when inputs change', () => {
    render(<SvgPlaceholderGenerator />);

    const widthInput = screen.getByLabelText('Width');
    const heightInput = screen.getByLabelText('Height');
    const textInput = screen.getByLabelText('Text');

    fireEvent.change(widthInput, { target: { value: 400 } });
    fireEvent.change(heightInput, { target: { value: 300 } });
    fireEvent.change(textInput, { target: { value: 'Hello World' } });

    expect(widthInput).toHaveValue(400);
    expect(heightInput).toHaveValue(300);
    expect(textInput).toHaveValue('Hello World');

    // The SVG element itself should have the text
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('copies data URI to clipboard', async () => {
    render(<SvgPlaceholderGenerator />);

    const copyDataUriButton = screen.getByText('Copy Data URI');
    fireEvent.click(copyDataUriButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    const copiedText = (navigator.clipboard.writeText as jest.Mock).mock.calls[0][0];
    expect(copiedText).toContain('data:image/svg+xml;utf8,');
  });

  it('copies SVG code to clipboard', async () => {
    render(<SvgPlaceholderGenerator />);

    const copySvgButton = screen.getByText('Copy SVG Code');
    fireEvent.click(copySvgButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    const copiedText = (navigator.clipboard.writeText as jest.Mock).mock.calls[0][0];
    expect(copiedText).toContain('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"');
    expect(copiedText).toContain('<rect width="100%" height="100%" fill="#cccccc"/>');
    expect(copiedText).toContain('800x600</text>');
  });
});
