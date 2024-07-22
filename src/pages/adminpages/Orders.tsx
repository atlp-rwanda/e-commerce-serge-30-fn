import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useFetchAllOrdersQuery } from '../../service/OrderApi';
import { useNavigate } from 'react-router-dom';
import { IOrder } from '../../types/Product.types';

interface IOrdersResponse {
  success: boolean;
  message: string;
  data: IOrder[];
}

const Orders: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  const navigate = useNavigate();
  const { data: responseData, isLoading, isError } = useFetchAllOrdersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (isError) {
    return <div>Failed to fetch orders. Please try again later.</div>;
  }

  const orders: IOrder[] =
    (responseData as unknown as IOrdersResponse)?.data || [];

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                Order ID
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                Customer Phone Number
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                Status
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {order.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {order.phone}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      order.status === 'delivered'
                        ? 'bg-green-500'
                        : order.status === 'pending'
                          ? 'bg-yellow-500'
                          : order.status === 'cancelled'
                            ? 'bg-red-500'
                            : 'bg-gray-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{`$${order.totalPrice}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(orders.length / ordersPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-gray-200' : 'bg-white'}`}
            >
              {index + 1}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default Orders;
