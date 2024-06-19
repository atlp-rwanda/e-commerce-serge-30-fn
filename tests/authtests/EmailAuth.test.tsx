import { fireEvent, render, screen, waitFor } from '../../src/utils/test-utils';
import LoginForm from '../../src/components/usercomponents/LoginForm';
import React from 'react';
import '@testing-library/jest-dom';

describe('LoginForm', () => {
  it('should render form fields', async () => {
    render(<LoginForm />);

    const emailInput = await screen.findByPlaceholderText(/email@domain\.com/i);
    expect(emailInput).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /sign in with email/i }),
    ).toBeInTheDocument();
  });
  it('should display an error if email is missing', async () => {
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    const submitButton = screen.getByRole('button', {
      name: /sign in with email/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/email is required/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
  it('should display an error if password is less than 8 characters', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/email@domain\.com/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    const submitButton = screen.getByRole('button', {
      name: /sign in with email/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /password must be minumum of 6 characters/i,
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
