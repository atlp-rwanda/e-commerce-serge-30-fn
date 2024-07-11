import React, { useState, useEffect } from 'react';
import { useAddProductToWishlistMutation } from '../../service/productApi';
import { toast } from 'react-toastify';
import { useToken } from '../../hooks/useToken';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export const AddToWishlist: React.FC<{
  productId: string;
  isInWishlist: boolean;
  className?: string;
  color?: string;
}> = ({ productId, isInWishlist, className, color = 'currentColor' }) => {
  const [wished, setWished] = useState(false);
  const { token, user } = useToken();
  const navigate = useNavigate();
  const [addProductToWishlist, { isLoading, isSuccess, isError, error }] =
    useAddProductToWishlistMutation();
  const errorMessage = (error as any)?.data?.message || 'network Error';

  const handleAddToWishlist = () => {
    if (!user || !token) {
      toast.error('Please Log In');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2500);
      return;
    }
    if (wished) return;

    addProductToWishlist({ product_id: productId, token });
  };
  useEffect(() => {
    if (isSuccess) {
      setWished(true);
      toast.success('Product added to wishlist successfully.');
    }

    if (isError) {
      toast.error('Failed to add product to wishlist:' + errorMessage);
    }
  }, [isSuccess, isError, errorMessage]);

  return (
    <div className="absolute top-2 right-2 p-1 z-10">
      <div className="relative group bg-gray-300 rounded-full h-9 w-9 flex items-center justify-center hover:bg-gray-200">
        <button
          aria-label="add to wishlist"
          onClick={handleAddToWishlist}
          className={`w-6 h-6 text-black transition-all ease-in-out cursor-pointer ${isLoading ? 'opacity-50' : ''} ${className}`}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isInWishlist || wished ? 'black' : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={isInWishlist || wished ? 'gray-300' : color}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
