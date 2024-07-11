import React from 'react';
import { ProductUpdateForm } from '../../components/vendorcomponents/ProductUpdateForm';
import { useParams, useNavigate } from 'react-router-dom';
import { ActionButton } from '../../components/vendorcomponents/ActionButton';
import { GiReturnArrow } from 'react-icons/gi';
export const ProductUpdatePage: React.FC = () => {
  const { id: productId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/vendor/products`);
  };

  if (!productId) return <div>Error: Product ID not found</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between px-2 items-center w-full">
        <h1 className="text-xl font-bold mb-4 sm:mb-0">PRODUCT UPDATE</h1>
        <ActionButton
          text="Back"
          colorClasses="bg-slate-800 text-white"
          IconComponent={GiReturnArrow}
          onClick={handleBackClick}
        />
      </div>

      <ProductUpdateForm productId={productId} />
    </div>
  );
};
