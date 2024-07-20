import React from 'react';
import { Button } from './Button';
import { useAddToCartMutation } from '../../service/authApi';
import { IProduct } from '../../types';
import { toast } from 'react-toastify';
import { useToken } from '../../hooks/useToken';
import { useNavigate } from 'react-router-dom';
import ProductLoader from './ProductLoader';

interface AddToCartButtonProps {
  product: IProduct;
  hidden?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  hidden = false,
}) => {
  const { token, user } = useToken();
  const [addToCart, { isLoading: addtocartLoading }] = useAddToCartMutation();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user || !token) {
      toast.error('Please Log In');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2500);
      return;
    } else if (user.role === 'ADMIN' || user.role === 'VENDOR') {
      setTimeout(() => {
        toast.dark('Cart is for buyers only');
      }, 500);
      return;
    }
    const response = await addToCart({
      productid: product.product_id,
      quantity: 1,
    });

    if (response.data) {
      const message = `${product.name} added to cart`;
      toast.success(message);
      return;
    }
    toast.error('Error adding to cart');
  };

  if (addtocartLoading) {
    return (
      <div className="flex items-center ">
        <h1>loading</h1>
        <ProductLoader count={9} />
      </div>
    );
  }

  return (
    <Button
      children="Buy Now"
      className={`flex items-center gap-2 px-4 py-2 bg-black text-white  rounded-sm w-full ${hidden ? 'hidden group-hover:block' : ''}`}
      onClick={handleAddToCart}
    />
  );
};
