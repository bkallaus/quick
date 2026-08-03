import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UuidGenerator from './uuid-generator';

describe('UuidGenerator', () => {
  let mockRandomUUID: jest.Mock;
  let mockWriteText: jest.Mock;

  beforeEach(() => {
    // Mock crypto.randomUUID
    mockRandomUUID = jest.fn().mockReturnValue('123e4567-e89b-12d3-a456-426614174000');
    Object.defineProperty(global, 'crypto', {
      value: { randomUUID: mockRandomUUID },
      configurable: true
    });

    // Mock navigator.clipboard.writeText
    mockWriteText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText
      }
    });
  });

  test('renders component and initial UUID', () => {
    render(<UuidGenerator />);
    expect(screen.getByText('UUID Generator')).toBeInTheDocument();

    const input = screen.getByLabelText('UUID') as HTMLInputElement;
    expect(input.value).toBe('123e4567-e89b-12d3-a456-426614174000');
  });

  test('generates new UUID on click', () => {
    render(<UuidGenerator />);

    mockRandomUUID.mockReturnValueOnce('987fcdeb-51a2-43d7-9012-345678901234');

    const generateBtn = screen.getByText('Generate');
    fireEvent.click(generateBtn);

    const input = screen.getByLabelText('UUID') as HTMLInputElement;
    expect(input.value).toBe('987fcdeb-51a2-43d7-9012-345678901234');
    expect(mockRandomUUID).toHaveBeenCalledTimes(2); // Once on mount, once on click
  });

  test('copies to clipboard', async () => {
    render(<UuidGenerator />);

    const copyBtn = screen.getByText('Copy');
    fireEvent.click(copyBtn);

    expect(mockWriteText).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });
});
