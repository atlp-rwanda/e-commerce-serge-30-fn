import React from 'react';
import {act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useForgotPassword } from '../../src/hooks/useForgotPassword';
import { renderWithProviders } from '../../src/utils/test-utils';
import * as authApi from '../../src/service/authApi'; 

vi.mock('../../src/service/authApi', () => ({
  useForgotPasswordMutation: vi.fn(),
}));

describe('useForgotPassword', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should handle successful forgot password request', async () => {
    const mockResponse = { message: 'A reset link has been sent to your email' };
    const mockForgotPassword = vi.fn().mockResolvedValue({ data: mockResponse });
    (authApi.useForgotPasswordMutation as any).mockReturnValue([mockForgotPassword, { isLoading: false }]);

    let result: ReturnType<typeof useForgotPassword> | undefined;

    renderWithProviders(<TestComponent hookResult={(hookResult) => { result = hookResult; }} />);

    await act(async () => {
      await result!.forgotPassword('test@example.com');
    });


  });

});

function TestComponent({ hookResult }: { hookResult: (result: ReturnType<typeof useForgotPassword>) => void }) {
  const result = useForgotPassword();
  React.useEffect(() => {
    hookResult(result);
  }, [hookResult, result]);
  return null;
}
