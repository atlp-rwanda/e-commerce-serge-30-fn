import React, { useState } from 'react';
import { useUpdateCartQuantityMutation } from '../../service/productApi';
import { Button } from '../rootcomponents/Button';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks';

interface UpdateCartProps {
  productId: string;
  initialQuantity: number;
}

export const UpdateCart: React.FC<UpdateCartProps> = ({
  productId,
  initialQuantity,
}) => {
  const [updateCartQuantity] = useUpdateCartQuantityMutation();
  const { cartId } = useAppSelector((state) => state.totalNumber);
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleUpdateQuantity = async (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }

    try {
      await updateCartQuantity({
        cartId,
        productId,
        quantity: change,
      }).unwrap();
      setQuantity(newQuantity);
    } catch (error) {
      const errorMessage = (error as any)?.data?.message || 'Network Error';
      toast.error(`Failed to update quantity: ${errorMessage}`);
    }
  };

  const increaseQuantity = () => handleUpdateQuantity(1);
  const decreaseQuantity = () => handleUpdateQuantity(-1);

  return (
    <span className="py-1 px-4">
      <Button
        className="px-0 bg-slate-400 hover:bg-slate-600 text-white rounded"
        onClick={decreaseQuantity}
      >
        -
      </Button>
      <span className="mx-2 text-sm text-slate-500">{quantity}</span>
      <Button
        className="bg-slate-400 hover:bg-slate-600 text-white rounded"
        onClick={increaseQuantity}
      >
        +
      </Button>
    </span>
  );
};
