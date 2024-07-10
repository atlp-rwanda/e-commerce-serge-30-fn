import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import { CartItem } from '../../types/Product.types';
import { Button } from './Button';

interface ProductRowProps {
  product: CartItem;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  return (
    <>
      <tr key={product.productId} className="border-b border-slate-900 ">
        <td className="py-1 px-4 flex items-center max-tablet:hidden max-tablet:mr-0">
          {product?.images && (
            <img
              src={product?.images[0]}
              alt="Product Image"
              className="w-12 h-12 mr-8 rounded-full m"
            />
          )}
        </td>
        <td className="py-1 px-4 ">{product.name}</td>
        <td className="flex-row bg-white p-1">
          <span className="py-1 px-4">
            <Button
              className=" px-0 bg-slate-400 hover:bg-slate-600 text-white rounded"
              children={'-'}
            />
            <span className="mx-2 text-sm text-slate-500">
              {product.quantity}
            </span>
            <Button
              className="  bg-slate-400 hover:bg-slate-600 text-white rounded"
              children={'+'}
            />
          </span>
        </td>
        <td className="py-1 px-4 max-sm:hidden">
          {' '}
          {product.price * product.quantity}.00
        </td>

        <td className="px-4">
          <div className="flex h-full justify-between items-center max-sm:hidden">
            <Link
              to={''}
              className="text-slate-400 hover:text-red-700 focus:outline-none"
            >
              <FaTrash className="text-lg" />
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
};
