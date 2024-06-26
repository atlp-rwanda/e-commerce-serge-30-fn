import logInImage from '../../assets/signupBg.png';
import { LoginForm } from '../../components/rootcomponents/LoginForm';
import { useNavigate } from 'react-router';

export function LoginPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleLoginWithGoogle = () => {};
  const handleLoginWithEmail = () => {};
  const handleForgotPassword = () => {
    navigate('/auth/forgotPassword');
  };
  return (
    <div className="flex bg-white">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${logInImage})` }}
      ></div>
      <div className="w-full lg:w-1/2  h-screen flex justify-center items-center">
        <LoginForm
          onGoBack={handleGoBack}
          onLoginWithGoogle={handleLoginWithGoogle}
          onLoginWithEmail={handleLoginWithEmail}
          onForgotPassword={handleForgotPassword}
        />
      </div>
    </div>
  );
}
