import { useEffect } from 'react';
import Logo from '../../assets/Shopping Cart_48px.png';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

/**
 * RequestPwdChangeForm component
 * This component renders on right side of 'renew-password' page
 * @returns {JSX.Element} - The rendered component.
 */
export const RequestPwdChangeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  /**
   * The email entered by the user with expired pwd
   * @type {string|undefined}
   */
  const email = location.state?.emailEntered;

  /**
   * Object
   * @type {{forgotPassword: function, loading: boolean, message: string, error: string}}
   */
  const {
    forgotPassword,
    loading,
    message,
    error: apiError,
  } = useForgotPassword();
  /**
   * Handles the password reset request with the user's email.
   * @async
   * @returns {Promise<void>}
   */
  const handleResetWithEmail = async () => {
    await forgotPassword(email);
    setTimeout(() => {
      navigate('/auth/login');
    }, 3000);
  };
  /**
   * @type {{apiError:string ,message:string }}
   */
  useEffect(() => {
    if (apiError) {
      toast.error(apiError);
    }
    if (message) {
      toast.success(message);
    }
    if (!email) {
      navigate('/');
    }
  }, [apiError, message]);

  return (
    <div className="flex justify-center items-center flex-col w-2/3 max-h-screen">
      <ToastContainer />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleResetWithEmail();
        }}
        className="flex flex-col bg-white-100 px-8 pt-6 pb-6 my-2 w-full max-w-md"
      >
        <h1 className="text-center font-bold flex flex-row justify-center text-xl">
          <img src={Logo} alt="logo" className="h-6 mr-1" />
          Exclusive
        </h1>
        <h5 className="text-center m-2 text-gray-700 tracking-4">
          Click on the reset link to renew Password{' '}
          <span className="font-bold text-slate-600">{email}</span>
        </h5>

        <div className="flex flex-col items-center text-white justify-between mb-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full hover:text-neutral-200"
          >
            {loading ? 'Sending...' : 'Send Link'}
          </Button>

          <Link to="/">
            <p className="text-center text-neutral-900 cursor-pointer hover:text-neutral-700 font-bold text-xs">
              Cancel
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};
