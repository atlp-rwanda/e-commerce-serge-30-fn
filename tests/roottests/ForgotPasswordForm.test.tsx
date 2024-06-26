import { render, screen, fireEvent } from '@testing-library/react';
import { ForgotPasswordForm } from '../../src/components/rootcomponents/ForgotPasswordForm';
import { useForgotPassword } from '../../src/hooks/useForgotPassword';
import { vi } from 'vitest';
import React from 'react';

vi.mock('../../src/hooks/useForgotPassword');

const mockUseForgotPassword = useForgotPassword as jest.MockedFunction<
  typeof useForgotPassword
>;

describe('ForgotPasswordForm', () => {
  it('should render form and handle email reset', async () => {
    mockUseForgotPassword.mockReturnValue({
      forgotPassword: vi.fn(),
      loading: false,
      message: '',
      error: '',
    });

    const onGoBack = vi.fn();

    render(<ForgotPasswordForm onGoBack={onGoBack} />);

    expect(screen.getByPlaceholderText('email@domain.com')).toBeInTheDocument();
    expect(screen.getByText('Reset with email')).toBeInTheDocument();
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('should handle API error', async () => {
    mockUseForgotPassword.mockReturnValue({
      forgotPassword: vi.fn(),
      loading: false,
      message: '',
      error: 'Something went wrong',
    });

    const onGoBack = vi.fn();

    render(<ForgotPasswordForm onGoBack={onGoBack} />);

    fireEvent.change(screen.getByPlaceholderText('email@domain.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByText('Reset with email'));

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });
});
