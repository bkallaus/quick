import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TemperatureConverter from './temperature-converter';

describe('TemperatureConverter', () => {
  it('renders the component with three inputs', () => {
    render(<TemperatureConverter />);

    expect(screen.getByLabelText(/Celsius/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fahrenheit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Kelvin/i)).toBeInTheDocument();
  });

  it('updates Fahrenheit and Kelvin when Celsius changes', () => {
    render(<TemperatureConverter />);

    const celsiusInput = screen.getByLabelText(/Celsius/i);
    fireEvent.change(celsiusInput, { target: { value: '0' } });

    expect(screen.getByLabelText(/Fahrenheit/i)).toHaveValue(32);
    expect(screen.getByLabelText(/Kelvin/i)).toHaveValue(273.15);
  });

  it('updates Celsius and Kelvin when Fahrenheit changes', () => {
    render(<TemperatureConverter />);

    const fahrenheitInput = screen.getByLabelText(/Fahrenheit/i);
    fireEvent.change(fahrenheitInput, { target: { value: '32' } });

    expect(screen.getByLabelText(/Celsius/i)).toHaveValue(0);
    expect(screen.getByLabelText(/Kelvin/i)).toHaveValue(273.15);
  });

  it('updates Celsius and Fahrenheit when Kelvin changes', () => {
    render(<TemperatureConverter />);

    const kelvinInput = screen.getByLabelText(/Kelvin/i);
    fireEvent.change(kelvinInput, { target: { value: '273.15' } });

    expect(screen.getByLabelText(/Celsius/i)).toHaveValue(0);
    expect(screen.getByLabelText(/Fahrenheit/i)).toHaveValue(32);
  });

  it('clears all inputs when one is cleared', () => {
    render(<TemperatureConverter />);

    const celsiusInput = screen.getByLabelText(/Celsius/i);
    fireEvent.change(celsiusInput, { target: { value: '10' } });

    expect(screen.getByLabelText(/Fahrenheit/i)).not.toHaveValue(null);

    fireEvent.change(celsiusInput, { target: { value: '' } });

    expect(screen.getByLabelText(/Fahrenheit/i)).toHaveValue(null);
    expect(screen.getByLabelText(/Kelvin/i)).toHaveValue(null);
  });
});
