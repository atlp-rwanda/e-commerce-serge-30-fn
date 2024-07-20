import React from 'react';
import { CartItem } from '../../types/Product.types';
import { DeleteCartProduct } from '../usercomponents/deleteCartProduct';
import { UpdateCart } from '../usercomponents/UpdateCart';

interface ProductRowProps {
  product: CartItem;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  const productPrice = product.price || 1;
  return (
    <>
      {product && (
        <tr key={product.productId} className="border-b border-slate-900">
          <td className="py-1 px-4 flex items-center max-tablet:hidden max-tablet:mr-0">
            {product?.images && (
              <img
                src={product?.images[0]}
                alt="Product Image"
                className="w-12 h-12 mr-8 rounded-full"
              />
            )}
          </td>
          <td className="py-1 px-4 ">{product.name}</td>
          <td className="flex-row bg-white p-1">
            <UpdateCart
              productId={product.productId}
              initialQuantity={product.quantity}
            />
          </td>
          <td className="py-1 px-4 max-sm:hidden">
            {productPrice * product.quantity}.00
          </td>
          <td className="px-4">
            <div className="flex h-full justify-between items-center max-sm:hidden">
              <DeleteCartProduct iconOnly productId={product.productId} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
