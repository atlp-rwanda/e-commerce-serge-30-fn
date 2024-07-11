import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import Footer from '../../components/rootcomponents/Footer';
import OrderSummary from '../../components/rootcomponents/OrderSummary';
import { TableBody } from '../../components/rootcomponents/TableBody';
import TableHeader from '../../components/rootcomponents/TableHeader';
import { useViewCartQuery } from '../../service/authApi';

const Cart: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setAuthenticated(!!token && !!user);
  }, []);
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
      <div className="flex gap-10 mt-12  items-center justify-center">
        <p>Not Logged In</p>
        <Button
          onClick={() => navigate('/login')}
          className="rounded-sm text-white py-2 mt-8"
          children={'Go to Login'}
        />
      </div>
    );
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!items || items.cart.products.length === 0) return <h1>Empty Cart</h1>;

  const cartItems = items.cart.products;

  return (
    <div className="bg-[#FAFAFA] font-outfit">
      <div className="flex justify-between gap-10 p-2 rounded-md m-10 max-tablet:flex-col">
        <div className="bg-white flex-1">
          <h1 className="px-4 py-2">Shopping Cart</h1>
          <TableHeader />
          <TableBody products={cartItems} />
        </div>
        <div className="bg-white p-8 rounded-md">
          <h1 className="border-b border-slate-200">Order Summary</h1>
          <OrderSummary label="Delivery" content="0" />
          <OrderSummary label="Shipping" content="0" />
          <OrderSummary label="Total" content="0" />
          <Button
            className="rounded-sm text-white py-2 mt-8"
            children="proceed to checkout"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
