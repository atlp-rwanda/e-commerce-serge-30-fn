// UserNavbar.test.jsx
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserNavbar from '../../src/components/usercomponents/UserNavbar';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
describe('UserNavbar', () => {
  test('renders greeting message', () => {
    render(
      <Provider store={store}>
        <UserNavbar />
      </Provider>,
    );
    const greeting = screen.getByText('Hello, Sage');
    expect(greeting).toBeInTheDocument();
  });

  test('renders date', () => {
    render(
      <Provider store={store}>
        <UserNavbar />
      </Provider>,
    );
    const date = screen.getByText('Wen, 20th 2024');
    expect(date).toBeInTheDocument();
  });

  test('button for user menu has the correct attributes', () => {
    render(
      <Provider store={store}>
        <UserNavbar />
      </Provider>,
    );
    const button = screen.getByRole('button', { name: /toggle user menu/i });
    expect(button).toHaveAttribute('aria-haspopup', 'menu');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
