import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideNav from './side-nav';

describe('SideNav', () => {
  test('renders navigation links', () => {
    render(<SideNav />);

    expect(screen.getByText('Shareable List')).toBeInTheDocument();
    expect(screen.getByText('Percent to Hex')).toBeInTheDocument();
    expect(screen.getByText('Ml to Cups')).toBeInTheDocument();
    expect(screen.getByText('Pour Over')).toBeInTheDocument();
    expect(screen.getByText('QR Code')).toBeInTheDocument();
    expect(screen.getByText('Iframe Tester')).toBeInTheDocument();
    expect(screen.getByText('Generate List')).toBeInTheDocument();
  });

  test('links have correct href attributes', () => {
    render(<SideNav />);

    expect(screen.getByText('Shareable List').closest('a')).toHaveAttribute('href', '#shareable-list');
    expect(screen.getByText('Percent to Hex').closest('a')).toHaveAttribute('href', '#percent-to-hex');
    expect(screen.getByText('Ml to Cups').closest('a')).toHaveAttribute('href', '#ml-to-cups');
    expect(screen.getByText('Pour Over').closest('a')).toHaveAttribute('href', '#pour-over');
    expect(screen.getByText('QR Code').closest('a')).toHaveAttribute('href', '#qr-code');
    expect(screen.getByText('Iframe Tester').closest('a')).toHaveAttribute('href', '#iframe-tester');
    expect(screen.getByText('Generate List').closest('a')).toHaveAttribute('href', '#generate-list');
  });
});
