import React, { useEffect, useState } from 'react';
import { useClearCartMutation } from '../../service/productApi';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../hooks/useToken';
import { ActionButton } from '../vendorcomponents/ActionButton';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetTotalNumber } from '../../slices/cartNumber.slice';

interface ClearCartProps {
  customClasses?: string;
  iconOnly?: boolean;
}

export const ClearCart: React.FC<ClearCartProps> = ({
  customClasses = '',
  iconOnly = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token, user } = useToken();
  const [clearCart, { isLoading, isError, isSuccess, error }] =
    useClearCartMutation();
  const errorMessage = (error as any)?.data?.message || 'network Error';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { totalNumber } = useAppSelector((state) => state.totalNumber);

  const handleClearCart = () => {
    if (!user || !token) {
      toast.error('Please Log In');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2500);
      return;
    }
    clearCart({}).unwrap();
  };

  const handleConfirmDelete = () => {
    handleClearCart();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Cart Cleared successfully.');
      dispatch(resetTotalNumber());
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }

    if (isError) {
      toast.error('Failed to clear cart:' + errorMessage);
    }
  }, [isSuccess, isError, navigate, errorMessage, dispatch, totalNumber]);

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
        text={iconOnly ? '' : 'Clear All'}
        colorClasses={`text-white transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${customClasses}`}
        IconComponent={() => <></>}
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
              Confirm Cart Clearing
            </h2>
            <p className="mb-10">Are you sure you want to clear your cart?</p>
            <div className="flex justify-start space-x-4">
              <ActionButton
                text="Cancel"
                colorClasses="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                IconComponent={() => <></>}
                onClick={() => setIsModalOpen(false)}
              />
              <ActionButton
                text="Clear"
                colorClasses="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
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
