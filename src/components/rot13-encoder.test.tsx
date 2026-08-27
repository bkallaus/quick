import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import Rot13Encoder from './rot13-encoder';

describe('Rot13Encoder', () => {
  it('renders correctly', () => {
    render(<Rot13Encoder />);
    expect(screen.getByText('ROT13 Encoder/Decoder')).toBeInTheDocument();
    expect(screen.getByLabelText(/Plain Text/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ROT13 Text/i)).toBeInTheDocument();
  });

  it('encodes plain text to ROT13', () => {
    render(<Rot13Encoder />);
    const plainInput = screen.getByLabelText(/Plain Text/i);
    const rot13Input = screen.getByLabelText(/ROT13 Text/i) as HTMLTextAreaElement;

    fireEvent.change(plainInput, { target: { value: 'Hello World!' } });
    expect(rot13Input.value).toBe('Uryyb Jbeyq!');
  });

  it('decodes ROT13 text to plain text', () => {
    render(<Rot13Encoder />);
    const plainInput = screen.getByLabelText(/Plain Text/i) as HTMLTextAreaElement;
    const rot13Input = screen.getByLabelText(/ROT13 Text/i);

    fireEvent.change(rot13Input, { target: { value: 'Uryyb Jbeyq!' } });
    expect(plainInput.value).toBe('Hello World!');
  });

  it('handles numbers and special characters correctly', () => {
    render(<Rot13Encoder />);
    const plainInput = screen.getByLabelText(/Plain Text/i);
    const rot13Input = screen.getByLabelText(/ROT13 Text/i) as HTMLTextAreaElement;

    fireEvent.change(plainInput, { target: { value: '12345 !@#$%^&*() _+-' } });
    expect(rot13Input.value).toBe('12345 !@#$%^&*() _+-');
  });

  it('handles lowercase and uppercase letters', () => {
    render(<Rot13Encoder />);
    const plainInput = screen.getByLabelText(/Plain Text/i);
    const rot13Input = screen.getByLabelText(/ROT13 Text/i) as HTMLTextAreaElement;

    fireEvent.change(plainInput, { target: { value: 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ' } });
    expect(rot13Input.value).toBe('nopqrstuvwxyzabcdefghijklm NOPQRSTUVWXYZABCDEFGHIJKLM');
  });
});
