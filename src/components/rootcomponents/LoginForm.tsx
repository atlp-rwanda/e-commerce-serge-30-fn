import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import googleLogo from '../../assets/Google_48px.png';
import Logo from '../../assets/Shopping Cart_48px.png';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  onGoBack: () => void;
  onLoginWithGoogle: () => void;
  onLoginWithEmail: () => void;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onGoBack,
  onLoginWithGoogle,
  onLoginWithEmail,
  onForgotPassword,
}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <div className="flex justify-center items-center flex-col w-2/3 max-h-screen">
      <form className="flex flex-col bg-white-100  px-8 pt-6 pb-6 my-2 w-full max-w-md">
        <h1 className="text-center font-bold flex flex-row justify-center text-xl">
          <img src={Logo} alt="logo" className="h-6 mr-1" />
          Exclusive
        </h1>
        <h1 className="text-center font-bold">Sign In</h1>
        <h5 className="text-center m-2">
          Enter your email to sign in for this app
        </h5>
        <Input
          id="userEmail"
          type="email"
          placeholder="email@domain.com"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <div className="flex flex-col items-center  text-white justify-between mb-2">
          <Button
            onClick={onLoginWithEmail}
            className="bg-black-500 mb-2 w-full"
          >
            Sign in with email
          </Button>

          <Button
            onClick={onForgotPassword}
            className="bg-black-500 mb-2 w-full"
          >
            Forgot Password
          </Button>

          <Button
            onClick={onGoBack}
            className="bg-black-500  text-white mb-2 w-full"
          >
            Go Back
          </Button>
          <h1 className="my-1  text-gray-500">or continue with</h1>
          <Button
            onClick={onLoginWithGoogle}
            className="hover:bg-black hover:text-white w-full bg-gray-100 text-black flex flex-row "
          >
            <img src={googleLogo} alt="Google Logo" className="h-6 mr-28" />
            Google
          </Button>
          <p className="mt-2 text-sm text-gray-600">
            Don't Have an account?{'  '}
            <Link to="/auth/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
