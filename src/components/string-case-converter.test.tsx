import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import StringCaseConverter from './string-case-converter';

describe('StringCaseConverter', () => {
  it('renders the component with input and output fields', () => {
    render(<StringCaseConverter />);

    expect(screen.getByRole('heading', { name: 'String Case Converter' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Text to Convert/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/camelCase/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/snake_case/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/kebab-case/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/PascalCase/i)).toBeInTheDocument();
  });

  it('converts text correctly', async () => {
    render(<StringCaseConverter />);

    const input = screen.getByLabelText(/Text to Convert/i);
    await userEvent.type(input, 'hello world examples');

    expect(screen.getByLabelText(/camelCase/i)).toHaveValue('helloWorldExamples');
    expect(screen.getByLabelText(/snake_case/i)).toHaveValue('hello_world_examples');
    expect(screen.getByLabelText(/kebab-case/i)).toHaveValue('hello-world-examples');
    expect(screen.getByLabelText(/PascalCase/i)).toHaveValue('HelloWorldExamples');
  });

  it('handles empty input correctly', async () => {
    render(<StringCaseConverter />);

    const input = screen.getByLabelText(/Text to Convert/i);
    await userEvent.type(input, 'test');
    await userEvent.clear(input);

    expect(screen.getByLabelText(/camelCase/i)).toHaveValue('');
    expect(screen.getByLabelText(/snake_case/i)).toHaveValue('');
    expect(screen.getByLabelText(/kebab-case/i)).toHaveValue('');
    expect(screen.getByLabelText(/PascalCase/i)).toHaveValue('');
  });
});
