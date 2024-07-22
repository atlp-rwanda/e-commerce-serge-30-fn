import { useState, useEffect } from 'react';
import { useGetWishlistMutation } from '../../service/productApi';
import { WishlistItem } from '../../types/wishlistData';
import { useToken } from '../../hooks/useToken';
import { toast, ToastContainer } from 'react-toastify';
import { IoBagHandleOutline } from 'react-icons/io5';
import UserTableSkeleton from '../../components/usercomponents/tableSkeleton';

const WishlistPage = () => {
  const [wishlistData, setWishlistData] = useState<WishlistItem[] | null>(null);
  const [getWishlist, { isLoading, isError, error }] = useGetWishlistMutation();
  const { token } = useToken();

  useEffect(() => {
    if (token) {
      getWishlist(token)
        .unwrap()
        .then((response) => {
          setWishlistData(response.wishlist);
          if (!response.wishlist.length) {
            toast.info('No items in your wishlist.');
          }
          console.log(wishlistData);
        })
        .catch((error) => {
          console.error('Failed to fetch wishlist:', error);
          toast.error('Failed to fetch wishlist');
        });
    }
  }, [getWishlist, token]);

  if (isLoading) {
    return (
      <div data-testid="table-skeleton" className="overflow-x-auto">
        <UserTableSkeleton />
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      'data' in error &&
      error.data &&
      typeof error.data === 'object' &&
      'message' in error.data
        ? (error.data as { message: string }).message
        : 'message' in error && typeof error.message === 'string'
          ? error.message
          : 'Unknown Error';
    return (
      <div className="text-center">
        <ToastContainer />
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

  const headers = ['Name', 'Quantity', 'Discount', 'Price', 'Availability'];

  return (
    <div>
      <ToastContainer />
      <div
        data-testid="myorders"
        className="flex items-center justify-center gap-2 mb-4 border-b border-neutral-100"
      >
        <IoBagHandleOutline className="text-4xl text-gray-500" />
        <h1 className="text-3xl font-semibold">My Wishlist</h1>
      </div>
      {wishlistData?.length ? (
        <table className="w-full table-auto">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-xs font-medium text-left uppercase tracking-wider text-gray-700 bg-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {wishlistData.map((order: WishlistItem) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-neutral-100 cursor-pointer"
              >
                <td className="px-4 py-2 text-sm text-gray-700 max-sm:hidden">
                  {order.Product.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {order.Product.quantity}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {order.Product.discount}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {order.Product.price}
                </td>
                <td className="px-4 py-2 text-sm text-green-600">
                  {order.Product.available ? 'Available' : 'Not Available'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">
          <p>No items in your wishlist.</p>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
