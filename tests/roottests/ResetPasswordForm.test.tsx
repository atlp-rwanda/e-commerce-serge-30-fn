import { render, fireEvent } from '@testing-library/react';
import { ResetPasswordForm } from '../../src/components/rootcomponents/ResetPasswordForm';
import React from 'react';
import { vi } from 'vitest';

describe('ResetPasswordForm', () => {
  it('renders the form correctly', async () => {
    const { queryAllByPlaceholderText } = render(
      <ResetPasswordForm onGoBack={vi.fn()} token="mockToken" />,
    );

    const passwordInputs = queryAllByPlaceholderText(/Password/i);

    expect(passwordInputs).toHaveLength(2);

    await fireEvent.change(passwordInputs[0], {
      target: { value: 'password123' },
    });
    expect(passwordInputs[0]).toHaveValue('password123');

    await fireEvent.change(passwordInputs[1], {
      target: { value: 'password456' },
    });
    expect(passwordInputs[1]).toHaveValue('password456');
  });

  it('displays error when passwords do not match', async () => {
    const { queryAllByPlaceholderText } = render(
      <ResetPasswordForm onGoBack={vi.fn()} token="mockToken" />,
    );

    const [passwordInput, confirmPasswordInput] =
      queryAllByPlaceholderText(/Password/i);

    await fireEvent.change(passwordInput, { target: { value: 'password123' } });
    await fireEvent.change(confirmPasswordInput, {
      target: { value: 'differentPassword' },
    });
  });

  it('displays error when password is too short', async () => {
    const { queryAllByPlaceholderText } = render(
      <ResetPasswordForm onGoBack={vi.fn()} token="mockToken" />,
    );

    const [passwordInput] = queryAllByPlaceholderText(/Password/i);

    await fireEvent.change(passwordInput, { target: { value: 'short' } });
  });
});
