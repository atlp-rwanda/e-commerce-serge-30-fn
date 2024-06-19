import Logo from '../../assets/Shopping Cart.png';
import { useEffect, useState } from 'react';
import { loginSchema, FormData } from '../../utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { setToken, setUser } from '../../redux/features/auth/authSlice';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../../redux/features/auth/authSlice';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../Input';
import LoginButton from '../rootcomponents/LoginButton';
import { useLoginUserMutation } from '../../service/authApi';
import { GoogleBtn } from '../authcomponents/GoogleBtn';
import { ColorRing } from 'react-loader-spinner';
interface LoginFormProps {
  onGoBack: () => void;
  onLoginWithGoogle: () => void;
  onForgotPassword: () => void;
}
const LoginForm: React.FC<LoginFormProps> = ({
  onGoBack,
  onForgotPassword,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isAuthenticated = useSelector((state: any) => state.user.token);
  const user = useSelector((state: any) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const [loginUser, { data, error, isSuccess, isError }] =
    useLoginUserMutation();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (isError && error) {
      toast.error('Invalid email or password');
      setError('root', {
        message: 'Invalid email or password',
      });
      setIsLoading(false); 
    }

    if (isSuccess && data) {
      const token = data.token;
      dispatch(setToken(token));
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      dispatch(setUser(decodedToken.user));
      toast.success('Login successfully');
      switch (user.role) {
        case 'USER':
          const from = location.state?.from?.pathname || '/';
          navigate(from);
          break;
        case 'ADMIN':
          navigate('admin');
          break;
        case 'VENDOR':
          navigate('vendor');
          break;
        default:
          navigate('/');
      }
      setIsLoading(false); 
    }
  }, [
    isError,
    isAuthenticated,
    isSuccess,
    error,
    data,
    searchParams,
    setSearchParams,
    navigate,
    location.state,
    dispatch,
    setError,
  ]);

  const onSubmit: SubmitHandler<FormData> = async (userCredentials) => {
    setIsLoading(true);
    await loginUser(userCredentials);
  };
  return (
    <>
      <div className="flex justify-center items-center flex-col w-2/3 max-sm:w-screen max-h-screen">
        <ToastContainer />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        )}
        <form className="flex flex-col bg-white-100  px-8 md:px-0 pt-6 pb-6 my-2 w-full max-w-md">
          <h1 className="text-center font-bold flex flex-row justify-center text-xl tracking-widest text-gray-900">
            {' '}
            <img src={Logo} alt="logo" className="h-6 mr-1" />
            Exclusive
          </h1>
          <h1 className="text-center font-semibold mt-5 text-xl tracking-wider text-gray-900 Outfit">
            Sign In
          </h1>
          <h5 className="text-center m-2 text-sm text-gray-800 mb-5 Outfit">
            Enter your email to sign in for this app
          </h5>
          <div className="mb-2">
            <Input
              id="email"
              type="email"
              placeholder="email@domain.com"
              {...register('email')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && typeof errors.email.message === 'string' && (
              <p className="text-red-500 text-md mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-2">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && typeof errors.password.message === 'string' && (
              <p className="text-red-500 text-md mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col items-center  text-white justify-between mb-2">
            <LoginButton type="submit" onClick={handleSubmit(onSubmit)}>
              Sign in with email
            </LoginButton>
            <LoginButton type="button" onClick={onForgotPassword}>
              Forgot Password
            </LoginButton>
            <LoginButton type="button" onClick={onGoBack}>
              Go Back
            </LoginButton>
            {isSuccess && (
              <p className="text-green-600 text-xs font-normal">
                Login successful!
              </p>
            )}
            <h1 className="my-5  text-gray-500 ">or continue with</h1>
            <GoogleBtn />
            <h6 className="mt-6 text-sm text-gray-400 text-center">
              Don't Have An Account?{'  '}
              <Link
                to="/auth/signup"
                className="text-gray-400 underline tracking-wider"
              >
                Sign up
              </Link>
              <p className="mt-3.5">
                By clicking continue, you agree to our{' '}
                <span className="font-semibold text-gray-500">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="font-semibold text-gray-500">
                  Privacy Policy
                </span>
              </p>
            </h6>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginForm;
