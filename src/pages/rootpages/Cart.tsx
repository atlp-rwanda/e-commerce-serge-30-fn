import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import Footer from '../../components/rootcomponents/Footer';
import OrderSummary from '../../components/rootcomponents/OrderSummary';
import { TableBody } from '../../components/rootcomponents/TableBody';
import TableHeader from '../../components/rootcomponents/TableHeader';
import { useViewCartQuery } from '../../service/authApi';
import { ClearCart } from '../../components/usercomponents/ClearCart';
import { IUser } from '../../types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdShoppingCart } from 'react-icons/md';

const Cart: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const adminVendorToastShownRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    if (token && userString) {
      const user: IUser = JSON.parse(userString);
      setAuthenticated(true);
      if (user.role === 'ADMIN' || user.role === 'VENDOR') {
        navigate('/');
        setTimeout(() => {
          if (!adminVendorToastShownRef.current) {
            toast.dark('Cart is for buyers only');
            adminVendorToastShownRef.current = true;
          }
        }, 500);
      }
    }
  }, [navigate]);

  const {
    data: items,
    isLoading,
    error,
    refetch,
  } = useViewCartQuery(
    {},
    {
      skip: !authenticated,
    },
  );

  useEffect(() => {
    if (authenticated) {
      refetch();
    }
  }, [authenticated, refetch]);

  if (!authenticated) {
    return (
      <div className="flex gap-10 mt-12 items-center justify-center">
        <p>Not Logged In</p>
        <Button
          onClick={() => navigate('/login')}
          className="rounded-sm text-white py-2 mt-8"
        >
          Go to Login
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    const errorMessage =
      'data' in error &&
      error.data &&
      typeof error.data === 'object' &&
      'message' in error.data
        ? (error.data as { message: string }).message
        : 'message' in error && typeof error.message === 'string'
          ? error.message
          : 'Unknown Error';

    if (errorMessage === 'Your cart is empty') {
      return (
        <h1 className="p-4 text-center bg-blue-400">
          <span className='flex items-center justify-center text-white gap-2'>
            <MdShoppingCart />
            Your cart is empty
          </span>
        </h1>
      );
    }

    return (
      <div className="text-center p-4 bg-red-400">
        Error: {errorMessage}, Please Sign in
      </div>
    );
  }

  if (!items || items.cart.products.length === 0) {
    return <h1 className="p-4 text-center bg-blue-400">Your cart is empty</h1>;
  }

  const cartItems = items.cart.products;

  const handleCheckoutClick = () => {
    navigate('/billing-details', { state: { cartItems } });
  };

  return (
    <div className="bg-[#FAFAFA] font-outfit">
      <ToastContainer />
      <div className="flex justify-between gap-10 p-2 rounded-md m-10 max-tablet:flex-col">
        <main className="bg-white">
          <div className="flex flex-1 justify-between items-center w-[29.7rem] py-4">
            <h1 className="px-4 py-2">Shopping Cart</h1>
            <ClearCart customClasses="bg-red-500 py-1 px-2 rounded hover:opacity-90 flex items-center transition duration-150 ease-in-out" />
          </div>
          <table>
            <TableHeader />
            <TableBody products={cartItems} />
          </table>
        </main>
        <div className="bg-white p-8 rounded-md">
          <h1 className="border-b border-slate-200">Order Summary</h1>
          <OrderSummary label="Delivery" content="0" />
          <OrderSummary label="Shipping" content="0" />
          <OrderSummary label="Total" content="0" />
          <Button
            className="rounded-sm text-white py-2 mt-8"
            onClick={handleCheckoutClick}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
