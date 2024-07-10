import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../src/components/index';
import React from 'react';
import { describe, test, expect, vi } from 'vitest';
describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button type="button" title="Submit" children="Submit" />);
    const buttonElement = screen.getByRole('button', { name: /Submit/i });

    expect(document.body.contains(buttonElement)).toBe(true);
  });
});

describe('Button Component within Form', () => {
  test('renders submit button and submits form', () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit" title="Submit" children="Submit" />
      </form>,
    );

    const buttonElement = screen.getByRole('button', { name: /Submit/i });

    fireEvent.click(buttonElement);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
