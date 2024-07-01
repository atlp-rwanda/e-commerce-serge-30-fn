import leftImage from '../../assets/ipad_pro__ea93uc0cnvsm_large_2x.jpg';
import { RequestPwdChangeForm } from '../../components';
export const RequestPwdChange = () => {
  return (
    <div className="flex bg-white">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center h-screen"
        role="image"
        style={{ backgroundImage: `url(${leftImage})` }}
      />
      <div
        className="w-full lg:w-1/2 h-screen flex justify-center items-center"
        role="form"
      >
        <RequestPwdChangeForm />
      </div>
    </div>
  );
};
