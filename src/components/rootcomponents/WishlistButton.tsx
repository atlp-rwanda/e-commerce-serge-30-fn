import React, { useState, useEffect, useRef } from 'react';
import { useGetWishlistMutation } from '../../service/productApi';
import { useToken } from '../../hooks/useToken';
import { AddToCartButton } from './AddToCartButton';

interface WishlistButtonProps {
  menuActive?: boolean;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  menuActive,
}) => {
  const [wishModal, setWishModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [wishlistData, setWishlistData] = useState<any>(null);
  const [getWishlist] = useGetWishlistMutation();
  const { token } = useToken();

  useEffect(() => {
    if (token) {
      getWishlist(token).then((response) => {
        setWishlistData(response.data.wishlist);
      });
    }
  }, [getWishlist, token, wishlistData]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setWishModal(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-label="wishlist button"
        onClick={() => setWishModal(true)}
        className="relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 w-6 h-6 cursor-pointer hover:text-red-500 hover:scale-105 hover:transition-all hover:duration-100 ${menuActive && 'w-12 h-12'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        <div
          className={`w-[1.05rem] h-[1.05rem] bg-red-400 absolute bottom-[1rem] left-4 rounded-full text-xs text-white text-center ${menuActive && 'w-8 h-8 text-2xl bottom-8 items-center left-6'}`}
        >
          {wishlistData?.length || 0}
        </div>
      </button>
      {wishModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
          role="dialog"
        >
          <div
            className="bg-white rounded-lg p-8 relative shadow-lg max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setWishModal(false)}
              aria-label="close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              My Wishlist
            </h2>
            <ul className="space-y-4">
              {wishlistData?.map((item: any) => (
                <li
                  key={item.id}
                  className="bg-gray-100 p-4 rounded-lg flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.Product.image_url[0]}
                      alt={item.Product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.Product.name || 'here'}
                      </h3>
                      <p className="text-gray-600">
                        Price: ${item.Product.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <AddToCartButton product={item.Product} hidden={false} />
                    <button className="bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600 focus:outline-none transition duration-150">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
