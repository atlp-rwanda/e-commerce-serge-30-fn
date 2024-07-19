import { Order } from '../../types/Order.types';
import OrdersTableHeader from './ordersTableHeader';
import UserTableSkeleton from './tableSkeleton';
import { useNavigate } from 'react-router-dom';

interface Props {
  orders: Order[];
  isLoading: boolean;
}

const AllOrders = ({ orders, isLoading }: Props) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div data-testid="table-skeleton" className="overflow-x-auto">
        <UserTableSkeleton />
      </div>
    );
  }

  function openOrder(order: Order) {
    navigate(`/user/orders/${order.id}`, { state: { order } });
  }

  function statusColor(status: string) {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'completed':
        return 'text-green-300';
      case 'cancelled':
        return 'text-red-300';
      default:
        return 'text-gray-300';
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <OrdersTableHeader />
        <tbody>
          {orders.map((order: Order) => (
            <tr
              key={order.id}
              className="border-b border-gray-200 hover:bg-neutral-100  cursor-pointer"
              onClick={() => openOrder(order)}
            >
              <td className="px-4 py-2 text-sm text-gray-700 max-sm:hidden">
                {order.products.length}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className={`px-4 py-2 text-sm ${statusColor(order.status)}`}>
                {order.status}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {order.totalPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
