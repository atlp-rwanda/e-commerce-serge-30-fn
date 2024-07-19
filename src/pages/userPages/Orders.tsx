import AllOrders from '../../components/usercomponents/Orders';
import { IoBagHandleOutline } from 'react-icons/io5';
import { useGetAllOrdersQuery } from '../../service/OrderApi';
import { useEffect, useState } from 'react';
import { Order } from '../../types';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../hooks/useToken';

export function OrderPage() {
  const { data, isLoading, isError, error } = useGetAllOrdersQuery();
  const [orders, setOrders] = useState<Order[]>([]);
  const errorMessage = (error as any)?.data?.message;
  const navigate = useNavigate();
  const { token, user } = useToken();

  useEffect(() => {
    if (!token && !user) {
      toast.dark('login to access orders');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    if (data) {
      setOrders(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.warn(errorMessage, {
        autoClose: false,
      });
    }
  }, [isError, errorMessage]);

  return (
    <div>
      <ToastContainer />
      <div
        data-testid="myorders"
        className="flex items-center justify-center gap-2 mb-4 border-b border-neutral-100"
      >
        <IoBagHandleOutline className="text-4xl text-gray-500" />
        <h1 className="text-3xl font-semibold">My orders</h1>
      </div>
      <AllOrders orders={orders} isLoading={isLoading} />
    </div>
  );
}
