import '../../App.css';
import HeroShowProduct from '../../components/rootcomponents/HeroShowProduct';
import ProductList from '../../components/rootcomponents/ProductList';
import ProductMarquee from '../../components/rootcomponents/ProductMarquee';
import Footer from '../../components/rootcomponents/Footer';
import HomeReviews from '../../components/rootcomponents/HomeReviews';
import FeaturesSection from '../../components/rootcomponents/FeatureSection';
import MoreServices from '../../components/rootcomponents/MoreServices';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setToken, setUser } from '../../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token') || null;
  const user = searchParams.get('user') || null;

  const dispatch = useDispatch();

  useEffect(() => {
    if (token != null) {
      localStorage.setItem('token', token);
      dispatch(setToken(token));
    }

    if (user != null) {
      const decodedUser = decodeURIComponent(user);
      const userObject = JSON.parse(decodedUser);

      dispatch(setUser(userObject));
    }
    setSearchParams({});
    window.history.replaceState({}, '', window.location.pathname);
  }, [token, user, dispatch]);
  return (
    <div className="max-tablet:px-4   backgroundImage">
      <div className="px-4 pt-6 flex gap-2 justify-between font-outfit">
        <div className="pt-4 pl-12 max-tablet:pl-2">
          <h1 className="text-6xl font-bold max-tablet:text-2xl">Store.</h1>{' '}
          <h1 className="text-6xl text-slate-500 max-laptop:text-2xl max-tablet:text-lg">
            The best way to buy the products you love.
          </h1>
          <button className=" group bg-black text-white p-2 px-4 rounded-sm mt-12 max-tablet:mt-6 ">
            <div className="flex gap-2 ">
              <span>Shop Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 w-4 hidden group-hover:block transition-all ease-in-out duration-700"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
        <div className="flex gap-2">
          <HeroShowProduct />
        </div>
      </div>
      <ProductMarquee />
      <div className="bg-[#fafafa]">
        <ProductList />
        <div className="px-12 font-outfit  bg-[#fafafa] my-8">
          <h1 className="font-bold text-6xl text-[#787878] max-tablet:text-xl">
            Even More reasons to shop with us
          </h1>

          <FeaturesSection />
        </div>
        <div className="bg-[#fafafa] font-outfit px-12 max-tablet:px-2 py-10">
          <h1 className="font-bold text-6xl text-[#787878] max-tablet:text-xl max-tablet:text-center">
            What other people say
          </h1>
          <HomeReviews />
        </div>
      </div>

      <MoreServices />

      <Footer />
    </div>
  );
}
