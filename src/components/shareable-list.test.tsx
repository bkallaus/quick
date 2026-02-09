import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShareableList from './shareable-list';

// Mock clipboard writeText
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

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
    setLocationSearch('');
  });

  test('renders ShareableList with items from URL', () => {
    setLocationSearch('?Key1=Value1&Key2=Value2');
    const { container } = render(<ShareableList />);

    expect(screen.getByText('Shareable List')).toBeInTheDocument();
    expect(screen.getByText('Key1')).toBeInTheDocument();
    expect(screen.getByText('Value1')).toBeInTheDocument();
    expect(screen.getByText('Key2')).toBeInTheDocument();
    expect(screen.getByText('Value2')).toBeInTheDocument();

    // Check container style
    // The structure is CalculationContainer -> div -> h4, div(items)
    // We want the inner div that wraps items.
    // We can find it by checking parent of items, or explicitly by style.

    // Let's find the article for Key1 and get its parent
    const item = screen.getByText('Key1').closest('article');
    const itemsContainer = item?.parentElement;

    expect(itemsContainer).toHaveStyle({ display: 'flex' });
    // After change, we expect flexDirection: 'column'
    expect(itemsContainer).toHaveStyle({ flexDirection: 'column' });
    expect(itemsContainer).not.toHaveStyle({ flexWrap: 'wrap' });
  });
});
