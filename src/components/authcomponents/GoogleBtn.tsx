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
    console.log({ options });
    const qs = new URLSearchParams(options);
    console.log(qs.toString());
    const googleAuthUrl = `${rootUrl}?${qs.toString()}`;
    console.log(googleAuthUrl);
    window.location.href = googleAuthUrl;
  };
  return (
    <div
      className={`flex items-center justify-center w-full ${className}`}
      onClick={handleGoogleLogin}
      style={{ cursor: 'pointer' }}
    >
      <div
        title="Click to continue with google"
        className="bg-[#EEEEEE] w-full text-black rounded-[8px] py-2 px-4 box-border relative hover:bg-[#eceaea]"
      >
        <img src={image2} alt="google icon" className="absolute top-[10px]" />
        <p>Signup with Google</p>
      </div>
    </div>
  );
};
