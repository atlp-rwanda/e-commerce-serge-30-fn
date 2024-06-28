import image2 from '../../assets/Google.png';

interface GoogleBtnProps {
  className?: string;
}

export const GoogleBtn: React.FC<GoogleBtnProps> = ({ className }) => {
  const handleGoogleLogin = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };
    const qs = new URLSearchParams(options);
    const googleAuthUrl = `${rootUrl}?${qs.toString()}`;
    window.location.href = googleAuthUrl;
  };

  return (
    <div
      className={`flex items-center justify-center w-full ${className}`}
      onClick={handleGoogleLogin}
      style={{ cursor: 'pointer' }}
    >
      <div
        title="Click to continue with Google"
        className="flex items-center justify-center bg-[#EEEEEE] w-full text-black rounded-[8px] px-4 py-2 hover:bg-[#eceaea] transition duration-300"
      >
        <img src={image2} alt="Google icon" className="w-6 h-6 mr-2" />
        <p className="text-sm sm:text-base">Sign up with Google</p>
      </div>
    </div>
  );
};
