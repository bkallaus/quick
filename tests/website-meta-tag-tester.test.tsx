import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import WebsiteMetaTagTester from '../src/components/website-meta-tag-tester';

describe('WebsiteMetaTagTester', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('renders the component initially', () => {
    render(<WebsiteMetaTagTester />);
    expect(screen.getByText('Website Meta Tag Tester')).toBeInTheDocument();
    expect(screen.getByLabelText('Website URL')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fetch Meta Tags' })).toBeInTheDocument();
  });

  test('fetches and displays meta tags correctly', async () => {
    const mockHtmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Page</title>
          <meta name="description" content="This is a test description">
          <meta property="og:title" content="Test OG Title">
          <meta charset="UTF-8">
        </head>
        <body></body>
      </html>
    `;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ contents: mockHtmlContent }),
    });

    render(<WebsiteMetaTagTester />);
    const input = screen.getByPlaceholderText('https://example.com');
    const button = screen.getByRole('button', { name: 'Fetch Meta Tags' });

    fireEvent.change(input, { target: { value: 'https://test.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Test Page')).toBeInTheDocument();
    });

    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();

    expect(screen.getByText('og:title')).toBeInTheDocument();
    expect(screen.getByText('Test OG Title')).toBeInTheDocument();

    expect(screen.getByText('charset')).toBeInTheDocument();
    expect(screen.getByText('UTF-8')).toBeInTheDocument();
  });

  test('handles network errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    render(<WebsiteMetaTagTester />);
    const input = screen.getByPlaceholderText('https://example.com');
    const button = screen.getByRole('button', { name: 'Fetch Meta Tags' });

    fireEvent.change(input, { target: { value: 'https://error.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  test('handles bad response from allorigins', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false
    });

    render(<WebsiteMetaTagTester />);
    const input = screen.getByPlaceholderText('https://example.com');
    const button = screen.getByRole('button', { name: 'Fetch Meta Tags' });

    fireEvent.change(input, { target: { value: 'https://bad.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch the URL')).toBeInTheDocument();
    });
  });

  test('handles empty HTML content', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ contents: "" }),
    });

    render(<WebsiteMetaTagTester />);
    const input = screen.getByPlaceholderText('https://example.com');
    const button = screen.getByRole('button', { name: 'Fetch Meta Tags' });

    fireEvent.change(input, { target: { value: 'https://empty.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('No content received')).toBeInTheDocument();
    });
  });
});
