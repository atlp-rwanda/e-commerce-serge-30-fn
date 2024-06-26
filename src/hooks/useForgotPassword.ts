/**
 * Custom hook for handling forgot password functionality.
 * @returns {{
 *   forgotPassword: (email: string) => Promise<void>,
 *   loading: boolean,
 *   message: string,
 *   error: string
 * }}
 */
import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_DEPLOYED_URL || '';

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'A reset link has been sent to your email');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('Network error, please try again later');
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, message, error };
};
