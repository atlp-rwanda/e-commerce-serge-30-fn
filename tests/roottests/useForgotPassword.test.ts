import { renderHook, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { useForgotPassword } from '../../src/hooks/useForgotPassword';

const API_BASE_URL = import.meta.env.VITE_DEPLOYED_URL || '';

describe('useForgotPassword', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  it('should handle successful forgot password request', async () => {
    fetchMock.post(`${API_BASE_URL}/api/v1/auth/forgot-password`, {
      message: 'A reset link has been sent to your email',
    });

    const { result } = renderHook(() => useForgotPassword());

    await act(async () => {
      await result.current.forgotPassword('test@example.com');
    });

    expect(result.current.message).toBe(
      'A reset link has been sent to your email',
    );
    expect(result.current.error).toBe('');
  });

  it('should handle failed forgot password request', async () => {
    fetchMock.post(`${API_BASE_URL}/api/v1/auth/forgot-password`, {
      status: 400,
      body: { message: 'Something went wrong' },
    });

    const { result } = renderHook(() => useForgotPassword());

    await act(async () => {
      await result.current.forgotPassword('test@example.com');
    });

    expect(result.current.message).toBe('');
    expect(result.current.error).toBe('Something went wrong');
  });

  it('should handle network error', async () => {
    fetchMock.post(`${API_BASE_URL}/api/v1/auth/forgot-password`, {
      throws: new Error('Network error'),
    });

    const { result } = renderHook(() => useForgotPassword());

    await act(async () => {
      await result.current.forgotPassword('test@example.com');
    });

    expect(result.current.message).toBe('');
    expect(result.current.error).toBe('Network error, please try again later');
  });
});
