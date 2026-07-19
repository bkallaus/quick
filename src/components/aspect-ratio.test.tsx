import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AspectRatio from './aspect-ratio';

describe('Aspect Ratio Component', () => {
  test('renders all input fields', () => {
    render(<AspectRatio />);
    expect(screen.getByTestId('orig-w')).toBeInTheDocument();
    expect(screen.getByTestId('orig-h')).toBeInTheDocument();
    expect(screen.getByTestId('new-w')).toBeInTheDocument();
    expect(screen.getByTestId('new-h')).toBeInTheDocument();
  });

  test('calculates new height based on new width', () => {
    render(<AspectRatio />);
    const origW = screen.getByTestId('orig-w');
    const origH = screen.getByTestId('orig-h');
    const newW = screen.getByTestId('new-w');
    const newH = screen.getByTestId('new-h');

    fireEvent.change(origW, { target: { value: '1920' } });
    fireEvent.change(origH, { target: { value: '1080' } });

    // Setting new width should calculate new height
    fireEvent.change(newW, { target: { value: '1280' } });

    expect(newH).toHaveValue(720);
  });

  test('calculates new width based on new height', () => {
    render(<AspectRatio />);
    const origW = screen.getByTestId('orig-w');
    const origH = screen.getByTestId('orig-h');
    const newW = screen.getByTestId('new-w');
    const newH = screen.getByTestId('new-h');

    fireEvent.change(origW, { target: { value: '1920' } });
    fireEvent.change(origH, { target: { value: '1080' } });

    // Setting new height should calculate new width
    fireEvent.change(newH, { target: { value: '720' } });

    expect(newW).toHaveValue(1280);
  });

  test('updates new dimensions if original dimensions are changed', () => {
    render(<AspectRatio />);
    const origW = screen.getByTestId('orig-w');
    const origH = screen.getByTestId('orig-h');
    const newW = screen.getByTestId('new-w');
    const newH = screen.getByTestId('new-h');

    fireEvent.change(origW, { target: { value: '1920' } });
    fireEvent.change(origH, { target: { value: '1080' } });
    fireEvent.change(newW, { target: { value: '1280' } });
    expect(newH).toHaveValue(720);

    // Change original width
    fireEvent.change(origW, { target: { value: '2560' } });
    expect(newW).toHaveValue(1280);
    expect(newH).toHaveValue(540); // 1280 * (1080/2560)
  });
});
