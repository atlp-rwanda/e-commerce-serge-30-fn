import image from '../../assets/ultraWatch2.jpeg';
import image1 from '../../assets/Shopping Cart.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GoogleBtn from '../../components/authcomponents/GoogleBtn';

const Signup = () => {
  return (
    <div className="grid grid-cols-2 h-full max-sm:grid-cols-1 max-md:grid-cols-1">
      <div className="w-full h-screen max-sm:hidden  max-md:hidden max-lg:h-full">
        <img src={image} alt="apple watch" className="w-[100%] h-[100%]" />
      </div>
      <div className="flex flex-col text-center items-center justify-center text-[16px] max-sm:h-full">
        <div className="flex gap-[7px] justify-center items-center mb-[12px]">
          <img src={image1} alt="shopping cart image" />
          <h1 className="font-bold text-[24px]">Exclusive</h1>
        </div>
        <div className="flex flex-col gap-[4px] mb-[10px]">
          <h2 className="text-[24px] font-semibold">Create an account</h2>
          <p className="font-normal">
            Enter your email to sign up for this app
          </p>
        </div>
        <form
          action=""
          className="flex flex-col justify-center items-center gap-[14px] w-full mb-[20px] max-sm:gap-[6px] max-sm:mb-[10px]"
        >
          <Input
            type="text"
            name="email"
            title="Enter your email"
            placeholder="email@domain.com"
          />
          <Input
            type="text"
            name="uname"
            title="Enter your username"
            placeholder="Username"
          />
          <Input
            type="text"
            name="fname"
            title="Enter your firstname"
            placeholder="Firstname"
          />
          <Input
            type="text"
            name="lname"
            title="Enter your lastname"
            placeholder="Lastname"
          />
          <Input
            type="password"
            name="password"
            title="Enter your password"
            placeholder="Password"
          />
          <Button type="submit" title="Click to submit">
            Sign up with email
          </Button>
          <Button type="button" title="Click to go back">
            Go Back
          </Button>
        </form>
        <div className="flex flex-col gap-[18px] w-[60%] text-[#828282] items-center justify-center max-sm:gap-[8px]">
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-b border-[#E6E6E6]"></div>
            <p className="text-center">or continue with</p>
            <div className="flex-grow border-b border-[#E6E6E6]"></div>
          </div>

          <GoogleBtn />
          <p className="font-normal">
            Already Have An Account?
            <span className="border-b ml-1">Sign in</span>
          </p>
          <p className="w-[80%] leading-relaxed">
            By clicking continue, you agree to our{' '}
            <span className="text-black font-bold ml-1 mr-1">
              Terms of Service
            </span>
            and <span className="text-black font-bold">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
