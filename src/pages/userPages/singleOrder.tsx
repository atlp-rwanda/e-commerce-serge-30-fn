import { useParams, useLocation, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle,
  ArrowsCounterClockwise,
  Info,
} from '@phosphor-icons/react';
import { FaTruck } from 'react-icons/fa';
import { Puff } from 'react-loader-spinner';
import { useGetSingleOrderQuery } from '../../service/OrderApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Order } from '../../types';
export function SingleOrder() {
  const { id = '' } = useParams();
  const [order, setOrder] = useState<any>({});
  const [pending, setPending] = useState(false);
  const [shipped, setShipped] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { data, isLoading, isError, error } = useGetSingleOrderQuery(id);
  const errorMessage = (error as any)?.data?.message;
  const location = useLocation();
  const currentOrder = location.state?.order as Order;

  useEffect(() => {
    if (data) {
      setOrder(data);
    }
    if (isError) {
      toast.warn(errorMessage, {
        autoClose: false,
      });
    }
  }, [data]);

  useEffect(() => {
    if (order) {
      switch (order.status) {
        case 'pending':
          setPending(true);
          break;
        case 'shipped':
          setShipped(true);
          break;
        case 'cancelled':
          setCancelled(true);
          break;
        case 'delivered':
          setCompleted(true);
          break;
        default:
          setPending(false);
          setShipped(false);
          setCancelled(false);
          setCompleted(false);
          break;
      }
    }
  }, [order]);

  if (isLoading) {
    return (
      <div
        data-testid="loading"
        className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center"
      >
        <Puff color="#D1D5DB" />
      </div>
    );
  }

  return (
    <div data-testid="container-of-singleOrder" className="flex flex-col p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-400">
          Order #{currentOrder?.id.toString().slice(0, 3)}
        </h1>
        <Link
          to="/customer-support"
          className="hover:text-neutral-400 self-end px-4 py-2"
        >
          <Info size={32} />
          <span className="text-neutral-400">Contact Support</span>
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Items in your order</h2>
          <div className="flex flex-wrap gap-4">
            {currentOrder?.products.map((product: any) => (
              <div className="w-1/2 md:w-1/4 lg:w-1/6 xl:w-1/8">
                <div className="border p-4">
                  <p className="text-neutral-400">
                    Quantity: {product.quantity}
                  </p>
                  <p className="text-neutral-400">Price: ${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 border">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="flex justify-between">
            <span className="text-neutral-400">Order Date</span>
            <span className="text-black font-semibold">
              {currentOrder && currentOrder.createdAt
                ? new Date(currentOrder.createdAt).toLocaleString()
                : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">total Price</span>
            <span className="text-black font-semibold">
              $
              {currentOrder && currentOrder.totalPrice
                ? currentOrder.totalPrice
                : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Estimated Delivery Date</span>
            <span className="text-black font-semibold">
              {order.expectedDeliveryDate ? (
                new Date(order.expectedDeliveryDate).toLocaleString()
              ) : (
                <div className="flex items-center gap-2">
                  <Info size={32} color="#aaa1de" weight="duotone" />
                  <span className="text-xl">N/A</span>
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Order Status:</h2>
          {pending && (
            <>
              <Clock size={48} />
              <span className="text-orange-500 text-2xl">Pending</span>
            </>
          )}
          {shipped && (
            <>
              <FaTruck size={48} />
              <span className="text-blue-500 text-2xl">Shipped</span>
            </>
          )}
          {cancelled && (
            <>
              <ArrowsCounterClockwise
                size={60}
                color="#aa7e5a"
                weight="duotone"
              />{' '}
              <span className="text-orange-800 text-2xl">Cancelled</span>
            </>
          )}

          {completed && (
            <>
              <CheckCircle size={48} />
              <span className="text-green-800 text-2xl">Completed</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
