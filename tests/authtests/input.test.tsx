import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../src/components/index';
import React from 'react';
import { vi } from 'vitest';

describe('Input Component', () => {
  test('renders input with correct placeholder', () => {
    render(<Input type="text" name="email" placeholder="Enter your email" />);
    const inputElement = screen.getByPlaceholderText(/Enter your email/i);
    expect(document.body.contains(inputElement)).toBe(true);
  });

  test('calls onChange when text is entered', () => {
    const handleChange = vi.fn();
    render(
      <Input
        type="text"
        name="email"
        placeholder="Enter your email"
        onChange={handleChange}
      />,
    );
    const inputElement = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(inputElement, { target: { value: 'test@example.com' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('displays the correct value', () => {
    render(
      <Input
        type="text"
        name="email"
        placeholder="Enter your email"
        value="test@example.com"
      />,
    );
    const inputElement = screen.getByPlaceholderText(/Enter your email/i);
    expect((inputElement as HTMLInputElement).value).toBe('test@example.com');
  });
});
