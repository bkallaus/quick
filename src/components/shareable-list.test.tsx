import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShareableList from './shareable-list';

// Mock clipboard writeText
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

// Mock window.history.pushState
const pushStateMock = jest.fn();
// window.history is usually writable or we can spy on it
Object.defineProperty(window, 'history', {
  value: {
    pushState: pushStateMock,
  },
  writable: true,
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

  test('renders ShareableList component', () => {
    render(<ShareableList />);
    expect(screen.getByText('Shareable List')).toBeInTheDocument();
    expect(screen.getByText('No items in the list. Add one below!')).toBeInTheDocument();
  });

  test('adds an item to the list', () => {
    render(<ShareableList />);

    const keyInput = screen.getByPlaceholderText('e.g. Username');
    const valueInput = screen.getByPlaceholderText('e.g. admin');
    const addButton = screen.getByText('Add');

    fireEvent.change(keyInput, { target: { value: 'TestKey' } });
    fireEvent.change(valueInput, { target: { value: 'TestValue' } });
    fireEvent.click(addButton);

    expect(screen.getByText('TestKey')).toBeInTheDocument();
    expect(screen.getByText('TestValue')).toBeInTheDocument();
    expect(screen.queryByText('No items in the list. Add one below!')).not.toBeInTheDocument();
  });

  test('removes an item from the list', () => {
    render(<ShareableList />);

    // Add item first
    const keyInput = screen.getByPlaceholderText('e.g. Username');
    const valueInput = screen.getByPlaceholderText('e.g. admin');
    const addButton = screen.getByText('Add');

    fireEvent.change(keyInput, { target: { value: 'TestKey' } });
    fireEvent.change(valueInput, { target: { value: 'TestValue' } });
    fireEvent.click(addButton);

    // Remove item
    const deleteButton = screen.getByLabelText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('TestKey')).not.toBeInTheDocument();
    expect(screen.getByText('No items in the list. Add one below!')).toBeInTheDocument();
  });

  test('generates URL', () => {
    render(<ShareableList />);

    const keyInput = screen.getByPlaceholderText('e.g. Username');
    const valueInput = screen.getByPlaceholderText('e.g. admin');
    const addButton = screen.getByText('Add');

    fireEvent.change(keyInput, { target: { value: 'User' } });
    fireEvent.change(valueInput, { target: { value: 'Admin' } });
    fireEvent.click(addButton);

    const generateButton = screen.getByText('Generate URL');
    fireEvent.click(generateButton);

    expect(pushStateMock).toHaveBeenCalled();
    const callArgs = pushStateMock.mock.calls[0];
    // check the URL argument (3rd arg)
    expect(callArgs[2]).toContain('User=Admin');
  });

  test('initializes from URL', () => {
    setLocationSearch('?Pre=Loaded');
    render(<ShareableList />);

    expect(screen.getByText('Pre')).toBeInTheDocument();
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
