/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/Group 1000005934.png';
import pride from '../../assets/store-card-40-pride-202405.jpeg';
import { Input } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button } from '../../components/rootcomponents/Button';
import { ColorRing } from 'react-loader-spinner';
import {
  useSendOtpMutation,
  useSendVerificationMutation,
  useVerifyCodeMutation,
} from '../../service/authApi';
import { useToken } from '../../hooks/useToken';
const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const { user } = useToken();
  const [tokens, setTokens] = useState<string | null>();
  const [sendOtp] = useSendOtpMutation();
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const [sendVerification, { isLoading: sendLoader }] =
    useSendVerificationMutation();

  const [otpCode, setOtpCode] = useState('');
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  useEffect(() => {
    const tokenss = localStorage.getItem('token');
    setTokens(tokenss);
    const redirect = async () => {
      if (!isAuthenticated || !user) {
        toast.error('user Not Logged In');
        navigate('/auth/login');
      }
      const email = user.email;
      try {
        const response = await sendOtp({ email });
        if (response.data) {
          toast.success('Enter verification code sent to your email');
        }
      } catch (error) {
        console.error('Error sending verification email:', error);
        toast.error('Error sending verification email');
      }
    };

    redirect();
  }, []);

  const handleVerification = async () => {
    if (!user) {
      toast.error('Email not sent, please click resend email');
      return;
    }
    const email = user.email;
    try {
      if (otpCode.length >= 5) {
        console.log(tokens);
        if (tokens) {
          const response = await verifyCode({ email, code: otpCode, tokens });
          console.log(response);
          if (response.data) {
            console.log(response.data.message);
            toast.success(response.data.message);
            navigate('/vendor');
          }
          if (response.error) {
            toast.error('Failed To verify code');
          }
        }
      } else {
        toast.error('Enter A valid Code');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      toast.error('Error during verification');
    }
  };

  const resendVerification = async () => {
    if (!user) {
      toast.error('Email not sent, please click resend email');
      return;
    }
    const email = user.email;
    try {
      if (tokens) {
        const response = await sendVerification({ tokens, email });
        if (response.data) toast.success('Email sent Successfully');
        if (response.error) toast.info('Email not sent Successfully');
      }
    } catch (error) {
      console.error('Error resending verification email:', error);
      toast.error('Error resending verification email');
    }
  };

  return (
    <div className="flex h-screen font-outfit">
      <ToastContainer />
      <div className="image h-screen w-[50vw] max-tablet:hidden">
        <img src={pride} alt="pride" className="h-screen w-full object-cover" />
      </div>
      <div className="content flex flex-col items-center justify-center w-[50vw] max-tablet:flex-1">
        <img src={logo} alt="" className="mb-4 w-44" />
        <h3 className="text-xl font-bold">OTP CODE</h3>
        <p className="py-2 text-sm text-slate-500">
          Enter code to sign in for this app
        </p>
        <Input
          type="text"
          name="otp"
          id="otp"
          placeholder="OTP CODE"
          className="border border-slate-400 rounded p-2 outline-none"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
        />
        <div className="flex flex-col gap-4 mt-8">
          {(isLoading || sendLoader) && (
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
          <Button
            children="Verify Code"
            className="bg-black border border-black text-white py-2 px-16 rounded hover:bg-white hover:text-black hover:border hover:border-slate-400 transition-all ease-in-out duration-300"
            onClick={handleVerification}
          />
          <Button
            className="bg-black border border-black text-white py-2 px-16 rounded hover:bg-white hover:text-black hover:border hover:border-slate-400 transition-all ease-in-out duration-300 disabled:bg-gray-500 disabled:border-slate-400 disabled:text-slate-400"
            onClick={resendVerification}
            children="Resend Verification"
            disabled={sendLoader}
          />
          <Button
            children="Go Back"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-black font-outfit text-white bg-black rounded hover:bg-white hover:text-black hover:border hover:border-slate-400 transition-all ease-in-out duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
