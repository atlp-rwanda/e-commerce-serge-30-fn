import image from '../../assets/ultraWatch2.jpeg';
import image1 from '../../assets/Shopping Cart.png';
import * as userComponents from '../../components/index';
import * as slices from '../../slices/index';
import { ColorRing } from 'react-loader-spinner';
import Modal from 'react-modal';
import axios from 'axios';
import * as hooks from '../../hooks/index';
import * as validation from '../../utils/index';
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

/**
 * Signup component for user registration.
 *
 * @component
 * @example
 * return (
 *   <Signup />
 * )
 */
export const Signup = () => {
  const dispatch = hooks.useAppDispatch();
  const {
    email,
    username,
    firstname,
    lastname,
    password,
    borderColor,
    isLoading,
    errorMessage,
    isOpen,
    isNavigating,
    errors,
  } = hooks.useAppSelector((state) => state.signup);

  /**
   * Handles input change and updates the corresponding state field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      slices.setField({
        field: name as keyof Omit<slices.SignupState, 'errors'>,
        value,
      }),
    );
  };

  /**
   * Handles form submission and user registration.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validation.validateForm(
      validation.signupSchema,
      { email, username, firstname, lastname, password },
      dispatch,
    );
    if (isValid) {
      dispatch(slices.setField({ field: 'isLoading', value: true }));
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_DEPLOYED_URL}/api/v1/create`,
          {
            username,
            email,
            password,
            firstname,
            lastname,
          },
        );

        if (response.status === 201) {
          dispatch(slices.setField({ field: 'isLoading', value: false }));
          dispatch(slices.setField({ field: 'isNavigating', value: true }));
        } else {
          dispatch(
            slices.setField({
              field: 'errorMessage',
              value: 'Failed to register new user',
            }),
          );
        }
      } catch (error) {
        dispatch(slices.setField({ field: 'isOpen', value: true }));
        dispatch(slices.setField({ field: 'isLoading', value: false }));
        if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
            case 400:
              dispatch(
                slices.setField({
                  field: 'errorMessage',
                  value: `Bad Request: Please check the data you're filling because ${error.response.data.message}`,
                }),
              );
              break;
            default:
              dispatch(
                slices.setField({
                  field: 'errorMessage',
                  value: `An unexpected error occurred. Please try again as ${error.response.data.message}`,
                }),
              );
              break;
          }
        } else if (error instanceof Error) {
          dispatch(
            slices.setField({ field: 'errorMessage', value: error.message }),
          );
        }
      }
    }
  };

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  /**
   * Closes the error modal.
   */
  function closeModal() {
    dispatch(slices.setField({ field: 'isOpen', value: false }));
  }

  return (
    <div className="grid grid-cols-2 w-full h-full max-sm:grid-cols-1 max-md:grid-cols-1 font-[outfit] max-lg:h-screen relative">
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
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className="absolute inset-0 flex items-center justify-center z-50 bg-transparent min-h-10 min-w-20"
          overlayClassName="fixed inset-0 bg-white bg-opacity-50 transition-opacity"
        >
          <div className="p-10 rounded-md bg-red-200">
            <h2 className="text-lg font-medium text-red-500">Error</h2>
            <div className="mt-4 text-gray-900">{errorMessage}</div>
            <button
              onClick={closeModal}
              className="mt-4 text-white font-bold py-2 px-4 rounded bg-rose-950"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
      {isNavigating && <Navigate to="/auth/login" replace={true} />}
      <div className="sticky top-0 bottom-0 right-[50%] h-screen max-sm:hidden max-md:hidden max-lg:h-full">
        <img src={image} alt="apple watch" className="w-full h-[100%]" />
      </div>
      <div className="flex flex-col text-center items-center justify-center text-[16px] max-sm:h-screen max-md:h-screen">
        <div className="flex gap-[6px] justify-center items-center mb-[8px]">
          <img src={image1} alt="shopping cart image" />
          <h1 className="font-bold text-[24px]">Exclusive</h1>
        </div>
        <div className="flex flex-col gap-[4px] mb-[10px] max-md:mb-8px">
          <h2 className="text-[24px] font-semibold">Create an account</h2>
          <p className="font-normal">
            Enter your email to sign up for this app
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-[8px] w-full mb-[20px] max-sm:gap-[6px] max-sm:mb-[10px] max-md:mb-[14px] max-lg:mb-[16px]"
        >
          <userComponents.Input
            type="text"
            name="email"
            title="Enter your email"
            borderColor={errors.email ? 'red' : borderColor}
            placeholder="email@domain.com"
            value={email}
            className1="flex flex-col items-center justify-center w-[60%] relative mb-0"
            className={`rounded-[8px] w-full border py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none font-medium text-[16px] ${borderColor === 'red' ? 'border-red-500' : 'border-[#E0E0E0]'}`}
            onChange={handleInputChange}
          />
          <div className="text-red-500">{errors.email}</div>
          <userComponents.Input
            type="text"
            name="username"
            title="Enter your username"
            borderColor={errors.username ? 'red' : borderColor}
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            className1="flex flex-col items-center justify-center w-[60%] relative mb-0"
            className={`rounded-[8px] w-full border py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none font-medium text-[16px] ${borderColor === 'red' ? 'border-red-500' : 'border-[#E0E0E0]'}`}
          />
          <div className="text-red-500">{errors.username}</div>
          <userComponents.Input
            type="text"
            name="firstname"
            title="Enter your firstname"
            borderColor={errors.firstname ? 'red' : borderColor}
            placeholder="Firstname"
            value={firstname}
            onChange={handleInputChange}
            className1="flex flex-col items-center justify-center w-[60%] relative mb-0"
            className={`rounded-[8px] w-full border py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none font-medium text-[16px] ${borderColor === 'red' ? 'border-red-500' : 'border-[#E0E0E0]'}`}
          />
          <div className="text-red-500">{errors.firstname}</div>
          <userComponents.Input
            type="text"
            name="lastname"
            title="Enter your lastname"
            borderColor={errors.lastname ? 'red' : borderColor}
            placeholder="Lastname"
            value={lastname}
            onChange={handleInputChange}
            className1="flex flex-col items-center justify-center w-[60%] relative mb-0"
            className={`rounded-[8px] w-full border py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none font-medium text-[16px] ${borderColor === 'red' ? 'border-red-500' : 'border-[#E0E0E0]'}`}
          />
          <div className="text-red-500">{errors.lastname}</div>
          <userComponents.Input
            type="password"
            name="password"
            title="Enter your password"
            borderColor={errors.password ? 'red' : borderColor}
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            className1="flex flex-col items-center justify-center w-[60%] relative mb-0"
            className={`rounded-[8px] w-full border py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none font-medium text-[16px] ${borderColor === 'red' ? 'border-red-500' : 'border-[#E0E0E0]'}`}
          />
          <div className="text-red-500">{errors.password}</div>
          <userComponents.Button
            type="submit"
            title="Click to submit"
            className="bg-black rounded-[8px] w-[60%] text-white border border-[#E0E0E0] py-2 px-4 box-border hover:opacity-90"
          >
            Sign up with email
          </userComponents.Button>
        </form>
        <div className="flex flex-col gap-[18px] w-[60%] text-[#828282] items-center justify-center max-sm:gap-[10px] max-md:gap-[14px] max-lg:gap-[16px]">
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-b border-[#E6E6E6]"></div>
            <p className="text-center">or continue with</p>
            <div className="flex-grow border-b border-[#E6E6E6]"></div>
          </div>
          <userComponents.GoogleBtn />
          <p className="font-normal">
            Already Have An Account?
            <Link to="/auth/login" replace={true}>
              <span className="ml-1 max-sm:flex max-sm:flex-wrap text-center justify-center underline">
                Sign in
              </span>
            </Link>
          </p>
          <p className="w-[80%] leading-relaxed">
            By clicking continue, you agree to our{' '}
            <span className="text-black font-bold ml-1 mr-1">
              Terms of Service
            </span>
            and <span className="text-black font-bold">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};
