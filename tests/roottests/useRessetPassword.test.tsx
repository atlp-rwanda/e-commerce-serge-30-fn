import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useResetPassword } from '../../src/hooks/useResetPassword';

global.fetch = vi.fn();

describe('useResetPassword', () => {
  it('should reset password successfully', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        message: 'Your password has been reset successfully',
      }),
    };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useResetPassword());

    await act(async () => {
      await result.current.resetPassword(
        'testToken',
        'newPassword',
        'newPassword',
      );
    });

    expect(result.current.message).toBe(
      'Your password has been reset successfully',
    );
    expect(result.current.error).toBe('');
    expect(result.current.loading).toBe(false);
  });

  it('should handle error during password reset', async () => {
    const mockResponse = {
      ok: false,
      json: async () => ({ message: 'Something went wrong' }),
    };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useResetPassword());

    await act(async () => {
      await result.current.resetPassword(
        'testToken',
        'newPassword',
        'newPassword',
      );
    });

    expect(result.current.error).toBe('Something went wrong');
    expect(result.current.message).toBe('');
    expect(result.current.loading).toBe(false);
  });

  it('should handle network error during password reset', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useResetPassword());

    await act(async () => {
      await result.current.resetPassword(
        'testToken',
        'newPassword',
        'newPassword',
      );
    });

    expect(result.current.error).toBe('Network error, please try again later');
    expect(result.current.message).toBe('');
    expect(result.current.loading).toBe(false);
  });
});
