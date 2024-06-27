import * as hooks from '../../hooks/index';
import * as validation from '../../utils/index';
import * as slices from '../../slices/index';
import { Link } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import * as userComponents from '../../components/index';

/**
 * VerificationFail component for handling failed verification attempts.
 *
 * @component
 * @example
 * return (
 *   <VerificationFail />
 * )
 */

export const VerificationFail = () => {
  const dispatch = hooks.useAppDispatch();
  const { email, message, isLoading, messageColor } = hooks.useAppSelector(
    (state) => state.verification,
  );

  /**
   * Handles the resend verification action.
   * Validates the email and dispatches the resend verification action.
   *
   * @async
   */

  const handleResendVerification = async () => {
    if (!email) {
      dispatch(slices.setMessage('Email is required.'));
      dispatch(slices.setMessageColor('text-red-500'));
      return;
    }

    const isValid = validation.validateEmails(
      validation.emailSchema,
      { email },
      dispatch,
    );
    if (!isValid) {
      return;
    }

    dispatch(slices.resendVerification(email));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
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
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center flex flex-col items-center justify-center">
        <img
          src="https://img.icons8.com/color/96/000000/cancel--v1.png"
          alt="Failure mark"
          className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
        />
        <h1 className="text-2xl font-semibold text-black mb-4">
          Verification Failed
        </h1>
        <p className="text-gray-700 mb-6">
          We couldn't verify your account. Please enter your email to resend the
          verification link.
        </p>
        <userComponents.Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => dispatch(slices.setEmail(e.target.value))}
          className="rounded-[8px] w-full border py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none font-medium text-[16px]"
          className1="w-[86%] mb-0"
        />
        <div className="flex items-center justify-center gap-5 h-20">
          <userComponents.Button
            onClick={handleResendVerification}
            className="inline-block bg-black text-white px-6 py-2 rounded-[8px] hover:bg-gray-800 transition duration-300"
            disabled={isLoading}
          >
            Resend Verification Link
          </userComponents.Button>
          <Link to="/">
            <userComponents.Button
              type="button"
              className="inline-block bg-gray-500 text-white px-6 py-2 rounded-[8px] hover:bg-gray-700 transition duration-300"
            >
              Back Home
            </userComponents.Button>
          </Link>
        </div>
        {message && <p className={`${messageColor} mb-2`}>{message}</p>}
      </div>
    </div>
  );
};
