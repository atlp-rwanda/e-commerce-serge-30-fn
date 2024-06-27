import { Link } from 'react-router-dom';

/**
 * VerificationPage component for displaying a successful verification message.
 *
 * @component
 * @example
 * return (
 *   <VerificationPage />
 * )
 */

export const VerificationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <img
          src="https://img.icons8.com/color/96/000000/ok--v1.png"
          alt="Success check mark"
          className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
        />
        <h1 className="text-2xl font-semibold text-black mb-4">
          Verification Successful
        </h1>
        <p className="text-gray-700 mb-6">
          Your account has been successfully verified. You can now use all the
          features of our service.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};
