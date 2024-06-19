import { useState } from 'react';
import { useForgotPasswordMutation } from '../service/authApi';

/**
 * Custom hook for handling forgot password functionality.
 * @returns {{
 * forgotPassword: (email: string) => Promise<void>,
 * loading: boolean,
 * message: string,
 * error: string
 * }}
 */
export const useForgotPassword = () => {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const forgotPassword = async (email: string) => {
    setError('');
    setMessage('');
    try {
      const result = await forgotPasswordMutation({ email }).unwrap();
      setMessage(result.message || 'A reset link has been sent to your email');
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'data' in error) {
        setError((error.data as { message?: string }).message || 'Something went wrong');
      } else {
        setError('Network error, please try again later');
      }
    }
  };

  return { forgotPassword, loading: isLoading, message, error };
};