import React, { useState } from 'react';
import { Button } from './Button';
import Input from '../Input';
import Logo from '../../assets/Shopping Cart_48px.png';
import { validateEmail } from '../../utils/validators';
import { useForgotPassword } from '../../hooks/useForgotPassword';

/**
 * Props interface for ForgotPasswordForm component.
 */
interface ForgotPasswordFormProps {
  /**
   * Callback function to handle navigation back action.
   */
  onGoBack: () => void;
}

/**
 * Component for handling the forgot password form.
 * @param {ForgotPasswordFormProps} props - Props object destructured to access `onGoBack` function.
 * @returns {JSX.Element} ForgotPasswordForm component JSX.
 */

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onGoBack,
}) => {
  const [emailReset, setEmailReset] = useState('');
  const [validationError, setValidationError] = useState('');
  const {
    forgotPassword,
    loading,
    message,
    error: apiError,
  } = useForgotPassword();
    /**
   * Handles form submission to initiate password reset.
   * Validates the email format and triggers the `forgotPassword` hook.
   * Sets appropriate error messages if validation fails or an API error occurs.
   * @returns {Promise<void>}
   */

  const handleResetWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(emailReset)) {
      setValidationError('Please enter a valid email address');
      return;
    }
    setValidationError('');
    await forgotPassword(emailReset);
  };

  return (
    <div className="flex justify-center items-center flex-col w-2/3 max-h-screen">
      <form
        onSubmit={handleResetWithEmail}
        className="flex flex-col bg-white-100 px-8 pt-6 pb-6 my-2 w-full max-w-md"
      >
        <h1 className="text-center font-bold flex flex-row justify-center text-xl">
          <img src={Logo} alt="logo" className="h-6 mr-1" />
          Exclusive
        </h1>
        <h1 className="text-center font-bold">Forgot Password</h1>
        <h5 className="text-center m-2">
          Enter your email to reset your password for this app
        </h5>
        <Input
          id="userEmail"
          type="email"
          placeholder="email@domain.com"
          value={emailReset}
          onChange={(e) => setEmailReset(e.target.value)}
        />
        {(validationError || apiError) && (
          <p className="text-red-500 my-1 bg-rose-100 text-center">
            {validationError || apiError}
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
            {loading ? 'Sending...' : 'Reset with email'}
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