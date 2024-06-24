import { render, screen } from '@testing-library/react';
import { Loading } from '../../src/utils/Loading';
import React from 'react';

describe('Loading Component', () => {
  test('renders loading spinner', () => {
    render(<Loading />);
    const spinnerElement = screen.getByTestId('loading-spinner');
    expect(document.body.contains(spinnerElement)).toBe(true);
  });

  test('renders default loading message', () => {
    render(<Loading />);
    const messageElement = screen.getByText(/Loading.../i);
    expect(document.body.contains(messageElement)).toBe(true);
  });

  test('renders custom loading message', () => {
    render(<Loading message="Custom loading message..." />);
    const messageElement = screen.getByText(/Custom loading message.../i);
    expect(document.body.contains(messageElement)).toBe(true);
  });
});
