import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_DEPLOYED_URL || '';

/**
 * Custom hook to handle password reset functionality.
 * @returns {{
 *   resetPassword: (token: unknown, newPassword: unknown, confirmPassword: unknown) => Promise<void>,
 *   loading: boolean,
 *   message: string,
 *   error: string
 * }} Object containing resetPassword function, loading state, success/error message, and error state.
 */

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  /**
   * Resets user password using the provided token and new password.
   * @param {unknown} token - Token received for password reset.
   * @param {unknown} newPassword - New password to be set.
   * @param {unknown} confirmPassword - Confirmation of the new password.
   * @returns {Promise<void>} Promise that resolves once password reset request completes.
   */

  const resetPassword = async (
    token: unknown,
    newPassword: unknown,
    confirmPassword: unknown,
  ) => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            password: newPassword,
            confirmPassword,
          }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Your password has been reset successfully');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('Network error, please try again later');
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, message, error };
};
