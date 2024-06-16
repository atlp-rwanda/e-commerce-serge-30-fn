import ForgotPasswordImage from '../../assets/ipad_pro__ea93uc0cnvsm_large_2x.jpg';
import { ForgotPasswordForm } from '../../components/rootcomponents/ForgotPasswordForm';
import { useNavigate } from 'react-router';

/**
 * React component for handling the forgot password functionality.
 * Displays a background image and renders the ForgotPasswordForm component.
 * @component
 */

export const ForgotPassword = () => {
  const navigate = useNavigate();

  /**
   * Function to navigate back to the login page.
   * Redirects the user to '/auth/login'.
   * @function handleGoBack
   */

  const handleGoBack = () => {
    navigate('/auth/login');
  };

  return (
    <div className="flex bg-white">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${ForgotPasswordImage})` }}
      />
      <div className="w-full lg:w-1/2 h-screen flex justify-center items-center">
        <ForgotPasswordForm onGoBack={handleGoBack} />
      </div>
    </div>
  );
};
