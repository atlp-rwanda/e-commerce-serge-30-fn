import { useEffect } from 'react';
import images from '../../assets/store-card-40-vision-pro-202401.jpeg';
import { CiLocationArrow1 } from 'react-icons/ci';
import HomeProducts from '../../components/usercomponents/HomeProducts';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../hooks/useToken';
import { Button } from '../../components';
const Home = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  useEffect(() => {
    if (!token) navigate('/');
  }, [navigate, token]);
  return (
    <div className="min-h-full">
      <div className="bg-gradient-to-r from-blue-800 to-white via-white custom  h-56 m-4 rounded-md flex justify-between  max-tablet:bg-gradient-to-r max-tablet:from-blue-800 max-tablet:to-white">
        <div className="p-4 ">
          <h1 className="text-white text-3xl">
            New Arrival change <br />
            your lifestyle
          </h1>
          <h4 className="text-slate-200 text-xl py-4">
            change your daily life with a modern lifestyle
          </h4>

          <Button
            className="px-4 py-2 hover:text-white flex items-center justify-between gap-4 text-black bg-slate-200  rounded-md hover:bg-transparent"
            onClick={() => navigate('/shop')}
          >
            {' '}
            Check Now
            <CiLocationArrow1 />
          </Button>
        </div>
        <div className="h-56 w-72 max-tablet:hidden">
          <img
            src={images}
            alt="vision"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <HomeProducts />
      </div>
    </div>
  );
};

export default Home;
