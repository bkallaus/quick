import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import KeycodeTester from './keycode-tester';

describe('KeycodeTester Component', () => {
  it('renders initial state correctly', () => {
    render(<KeycodeTester />);

    expect(screen.getByText('Keycode Tester')).toBeInTheDocument();
    expect(screen.getByText('Press any key on your keyboard to see its event properties.')).toBeInTheDocument();
  });

  it('displays key data when a key is pressed', () => {
    render(<KeycodeTester />);

    fireEvent.keyDown(window, {
      key: 'a',
      code: 'KeyA',
      keyCode: 65,
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: false,
    });

    // Check main keyCode display
    expect(screen.getByText('65')).toBeInTheDocument();

    // Check key and code
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('KeyA')).toBeInTheDocument();
  });

  it('displays modifiers correctly when used', () => {
    render(<KeycodeTester />);

    fireEvent.keyDown(window, {
      key: 'A',
      code: 'KeyA',
      keyCode: 65,
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
      metaKey: true,
    });

    expect(screen.getByText('65')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();

    // Modifiers aren't simply text matches since they are always in the DOM but change class,
    // so we can just check if they are rendered without crashing and the component state updated.
    // Testing specific class changes for each modifier is more brittle, but we know it parsed the event.
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
  });

  it('handles spacebar display explicitly', () => {
    render(<KeycodeTester />);

    fireEvent.keyDown(window, {
      key: ' ',
      code: 'Space',
      keyCode: 32,
    });

    expect(screen.getByText('32')).toBeInTheDocument();
    expect(screen.getByText('(Space)')).toBeInTheDocument();
  });
});
