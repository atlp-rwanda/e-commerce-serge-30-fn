import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDeleteCartProductMutation } from '../../service/productApi';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '../vendorcomponents/ActionButton';

interface DeleteCartButtonProps {
  productId?: string;
  onSuccess?: () => void;
  customClasses?: string;
  iconOnly?: boolean;
}

export const DeleteCartProduct: React.FC<DeleteCartButtonProps> = ({
  productId,
  onSuccess,
  customClasses = '',
  iconOnly = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCartProduct, { isLoading, isError, isSuccess, error }] =
    useDeleteCartProductMutation();
  const navigate = useNavigate();
  const errorMessage = (error as any)?.data?.message || 'network Error';

  const handleDelete = async () => {
    await deleteCartProduct({ productId }).unwrap();
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Product deleted successfully.');
      window.location.reload();

      if (onSuccess) {
        onSuccess();
      }
    }

    if (isError) {
      toast.error('Failed to delete product from your cart:' + errorMessage);
    }
  }, [isSuccess, isError, onSuccess, navigate, errorMessage]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={`relative ${customClasses}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}
      <ActionButton
        text={iconOnly ? '' : 'Delete'}
        colorClasses={`text-red-500 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${customClasses}`}
        IconComponent={FaTrashAlt}
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
      />

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50 transition-opacity"
          onClick={handleOverlayClick}
        >
          <div className="p-10 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">
              Confirm Product Deletion
            </h2>
            <p className="mb-10">
              you want to remove this product from your cart?
            </p>
            <div className="flex justify-start space-x-4">
              <ActionButton
                text="Cancel"
                colorClasses="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                IconComponent={() => <></>}
                onClick={() => setIsModalOpen(false)}
              />
              <ActionButton
                text="Delete"
                colorClasses="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                IconComponent={() => <></>}
                onClick={handleConfirmDelete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
