import React, { useState } from 'react';
import { Button } from './Button';
import Input from '../Input';
import Logo from '../../assets/Shopping Cart_48px.png';
import { validatePassword, passwordsMatch } from '../../utils/validators';
import { useResetPassword } from '../../hooks/useResetPassword';

/**
 * Props for the ResetPasswordForm component.
 * @typedef {Object} ResetPasswordFormProps
 * @property {() => void} onGoBack - Function to handle going back.
 * @property {string | undefined} token - Token for resetting password.
 */

/**
 * ResetPasswordForm component for resetting user password.
 * @param {ResetPasswordFormProps} props - Component props.
 * @returns {JSX.Element} JSX element representing the ResetPasswordForm.
 */

interface ResetPasswordFormProps {
  onGoBack: () => void;
  token: string | undefined;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onGoBack,
  token,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const {
    resetPassword,
    loading,
    message,
    error: apiError,
  } = useResetPassword();

  /**
   * Handles the password reset process.
   * Validates password and confirms if passwords match before resetting.
   * @returns {Promise<void>}
   */

  const handleResetPassword = async () => {
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!passwordsMatch(password, confirmPassword)) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    await resetPassword(token, password, confirmPassword);
  };

  return (
    <div className="flex justify-center items-center flex-col w-2/3 max-h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleResetPassword();
        }}
        className="flex flex-col bg-white-100 px-8 pt-6 pb-6 my-2 w-full max-w-md"
      >
        <h1 className="text-center font-bold flex flex-row justify-center text-xl">
          <img src={Logo} alt="logo" className="h-6 mr-1" />
          Exclusive
        </h1>
        <h1 className="text-center font-bold">Reset Password</h1>
        <h5 className="text-center m-2">
          Update your password to sign in for this app
        </h5>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {(error || apiError) && (
          <p className="text-red-500 my-1 bg-rose-100 text-center">
            {error || apiError}
          </p>
        )}
        {message && (
          <p className="text-green-500 my-1 bg-green-100 text-center">
            {message}
          </p>
        )}

        <div className="flex flex-col items-center text-white justify-between mb-2">
          <Button
            type="submit"
            className="bg-black-500 mb-2 w-full"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
          <Button
            onClick={onGoBack}
            className="bg-black-500 text-white mb-2 w-full"
            type="button"
          >
            Go Back
          </Button>
        </div>
      </form>
    </div>
  );
};
