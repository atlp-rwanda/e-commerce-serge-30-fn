import logInImage from '../../assets/store-card-40-watch-s9-202309.png';
import LoginForm from '../../components/usercomponents/LoginForm';
import { useNavigate } from 'react-router';
export function LoginPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };
  const handleLoginWithGoogle = () => {};
  const handleForgotPassword = () => {
    navigate('/auth/forgotPassword');
  };
  return (
    <div className="flex bg-white">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover abg-center h-screen"
        style={{ backgroundImage: `url(${logInImage})` }}
      ></div>
      <div className="w-screen lg:w-1/2  h-screen flex justify-center items-center">
        <LoginForm
          onGoBack={handleGoBack}
          onLoginWithGoogle={handleLoginWithGoogle}
          onForgotPassword={handleForgotPassword}
        />
      </div>
    </div>
  );
}
