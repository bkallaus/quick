import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShareableList from './shareable-list';

// Helper to set window.location.search
const setLocationSearch = (search: string) => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      ...window.location,
      search,
      pathname: '/quick',
    },
  });
};

describe('ShareableList', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockReturnValue(Promise.resolve()),
      },
      writable: true,
      configurable: true,
    });

    setLocationSearch('');
  });

  test('renders ShareableList with items from URL', () => {
    setLocationSearch('?Key1=Value1&Key2=Value2');
    render(<ShareableList />);

    expect(screen.getByText('Shareable List')).toBeInTheDocument();
    expect(screen.getByText('Key1')).toBeInTheDocument();
    expect(screen.getByText('Value1')).toBeInTheDocument();
    expect(screen.getByText('Key2')).toBeInTheDocument();
    expect(screen.getByText('Value2')).toBeInTheDocument();

    const item = screen.getByText('Key1').closest('article');
    const itemsContainer = item?.parentElement;

    expect(itemsContainer).toHaveStyle({ display: 'flex' });
    expect(itemsContainer).toHaveStyle({ flexDirection: 'column' });
    expect(itemsContainer).not.toHaveStyle({ flexWrap: 'wrap' });
  });

  test('shows Copied! feedback on click', async () => {
    jest.useFakeTimers();
    setLocationSearch('?TestKey=TestValue');
    render(<ShareableList />);

    const button = screen.getByText('Copy');
    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('TestValue');

    // Wait for the text to change
    await screen.findByText('Copied!');

    // Check class change
    const copiedButton = screen.getByText('Copied!');
    expect(copiedButton).toHaveClass('secondary');
    expect(copiedButton).not.toHaveClass('outline');

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText('Copy')).toBeInTheDocument();

    // Check class revert
    const revertedButton = screen.getByText('Copy');
    expect(revertedButton).toHaveClass('secondary');
    expect(revertedButton).toHaveClass('outline');

    jest.useRealTimers();
  });
});
