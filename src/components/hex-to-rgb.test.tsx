import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HexToRgb from './hex-to-rgb';

describe('HexToRgb', () => {
  it('renders correctly', () => {
    render(<HexToRgb />);
    expect(screen.getByText('Hex to RGB')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('#FFFFFF')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('255, 255, 255')).toBeInTheDocument();
  });

  it('converts hex to rgb correctly', () => {
    render(<HexToRgb />);
    const hexInput = screen.getByPlaceholderText('#FFFFFF');
    const rgbInput = screen.getByPlaceholderText('255, 255, 255');
    const preview = screen.getByTestId('color-preview');

    fireEvent.change(hexInput, { target: { value: '#ff0000' } });
    expect(rgbInput).toHaveValue('255, 0, 0');
    expect(preview).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('converts short hex to rgb correctly', () => {
    render(<HexToRgb />);
    const hexInput = screen.getByPlaceholderText('#FFFFFF');
    const rgbInput = screen.getByPlaceholderText('255, 255, 255');
    const preview = screen.getByTestId('color-preview');

    fireEvent.change(hexInput, { target: { value: '#0f0' } });
    expect(rgbInput).toHaveValue('0, 255, 0');
    expect(preview).toHaveStyle({ backgroundColor: 'rgb(0, 255, 0)' });
  });

  it('converts hex without hash to rgb correctly', () => {
    render(<HexToRgb />);
    const hexInput = screen.getByPlaceholderText('#FFFFFF');
    const rgbInput = screen.getByPlaceholderText('255, 255, 255');
    const preview = screen.getByTestId('color-preview');

    fireEvent.change(hexInput, { target: { value: '0000ff' } });
    expect(rgbInput).toHaveValue('0, 0, 255');
    expect(preview).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
  });

  it('converts rgb to hex correctly', () => {
    render(<HexToRgb />);
    const hexInput = screen.getByPlaceholderText('#FFFFFF');
    const rgbInput = screen.getByPlaceholderText('255, 255, 255');
    const preview = screen.getByTestId('color-preview');

    fireEvent.change(rgbInput, { target: { value: '255, 128, 0' } });
    expect(hexInput).toHaveValue('#FF8000');
    expect(preview).toHaveStyle({ backgroundColor: 'rgb(255, 128, 0)' });
  });

  it('handles invalid hex input', () => {
    render(<HexToRgb />);
    const hexInput = screen.getByPlaceholderText('#FFFFFF');
    const rgbInput = screen.getByPlaceholderText('255, 255, 255');
    const preview = screen.getByTestId('color-preview');

    fireEvent.change(hexInput, { target: { value: 'invalid' } });
    expect(rgbInput).toHaveValue('');
    expect(preview).toHaveStyle({ backgroundColor: 'transparent' });
  });

  it('handles invalid rgb input', () => {
    render(<HexToRgb />);
    const hexInput = screen.getByPlaceholderText('#FFFFFF');
    const rgbInput = screen.getByPlaceholderText('255, 255, 255');
    const preview = screen.getByTestId('color-preview');

    fireEvent.change(rgbInput, { target: { value: '300, 300, 300' } });
    expect(hexInput).toHaveValue('');
    expect(preview).toHaveStyle({ backgroundColor: 'transparent' });
  });
});
