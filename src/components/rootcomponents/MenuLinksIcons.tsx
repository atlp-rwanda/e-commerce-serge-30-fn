import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation, useViewCartQuery } from '../../service/authApi';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { BsBagCheck } from 'react-icons/bs';
import { CiStar } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { useToken } from '../../hooks/useToken';
import { ToastContainer, toast } from 'react-toastify';
import { useGetWishlistMutation } from '../../service/productApi';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTotalNumber } from '../../slices/cartNumber.slice';
import * as components from '../index';

interface MenuLinkIconProp {
  menuActive?: boolean;
  className?: string;
}

const MenuLinksIcons = ({ menuActive, className }: MenuLinkIconProp) => {
  const { data: items, refetch } = useViewCartQuery({});
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { token, user } = useToken();
  const [modal, setModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { totalNumber } = useAppSelector((state) => state.totalNumber);
  const handleClick = () => {
    navigate('user');
  };
  const handleLogout = async () => {
    try {
      await logout({});
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const [getWishlist] = useGetWishlistMutation();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setModal(false);
      }
    };
    if (items) {
      dispatch(setTotalNumber(items.cart.products.length));
    }
    if (modal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    const intervalId = setInterval(() => {
      refetch();
    }, 5000);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, getWishlist, items, modal, refetch, token, totalNumber]);

  const handleCart = () => {
    if (!user) {
      toast.error(' Not Logged In');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
      return;
    }
  };
  return (
    <div className={className}>
      <ToastContainer />
      <components.WishlistButton menuActive={menuActive} />
      <Link
        to={user ? '/cart' : '/'}
        className="relative hover:text-red-500 hover:scale-105 hover:transition-all hover:duration-100"
        onClick={handleCart}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 w-6 h-6 ${menuActive && 'w-12 h-12'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <div
          className={`w-[1.05rem] h-[1.05rem] bg-red-400 absolute bottom-[1rem] left-4 rounded-full text-xs text-white text-center ${menuActive && 'w-8 h-8 text-2xl bottom-8 items-center left-6'}`}
        >
          {totalNumber}
        </div>
      </Link>
      <div ref={dropdownRef} onClick={() => setModal(!modal)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onDoubleClick={handleClick}
          className={`size-6 w-6 h-6 ${menuActive && 'w-12 h-12'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        {modal && (
          <div className="absolute top-8 right-24 bg-slate-800 rounded-md text-white flex flex-col p-4 px-8 gap-4">
            <Link to="/" className="flex items-center gap-2">
              <MdOutlineAccountCircle />
              Manage My Account
            </Link>
            <Link to="/new" className="flex items-center gap-2">
              <BsBagCheck />
              My Order
            </Link>
            <Link to="/shop" className="flex items-center gap-2">
              <CiStar />
              My Reviews
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <CiLogout />
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuLinksIcons;
