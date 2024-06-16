/**
 * ResetPassword component renders a page for resetting password.
 * It displays a background image and a form to reset password.
 *
 * @module ResetPassword
 */
import ResetPasswordImage from '../../assets/videoframe_3040.png';
import { ResetPasswordForm } from '../../components/rootcomponents/ResetPasswordForm';
import { useNavigate, useParams } from 'react-router-dom';

export function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  /**
   * Navigates the user back to the Forgot Password page.
   */

  const handleGoBack = () => {
    navigate('/auth/forgotPassword');
  };

  return (
    <div className="flex bg-white">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${ResetPasswordImage})` }}
      />
      <div className="w-full lg:w-1/2 h-screen flex justify-center items-center">
        <ResetPasswordForm onGoBack={handleGoBack} token={token} />
      </div>
    </div>
  );
}
