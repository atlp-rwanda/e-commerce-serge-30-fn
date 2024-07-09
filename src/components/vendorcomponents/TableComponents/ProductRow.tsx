import React from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaEye } from 'react-icons/fa';
import { IProduct } from '../../../types';
import * as vendorComponents from '../../../components/index';

interface ProductRowProps {
  product: IProduct;
  formatDate: (_date: string) => string;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  product,
  formatDate,
}) => {
  const handleDeleteSuccess = () => {
    window.location.reload();
  };
  return (
    <tr key={product.product_id} className="border-b">
      <td className="py-1 px-4 flex items-center">
        <img
          src={product.image_url[0]}
          alt="Product Image"
          className="w-12 h-12 mr-4"
        />
      </td>
      <td className="py-1 px-4">{product.name}</td>
      <td className="py-1 px-4">{product.price}.00</td>
      <td className="py-1 px-4">{product.discount}</td>
      <td className="py-1 px-4">{product.quantity}</td>
      <td className="py-1 px-4">{product.Category.name}</td>
      <td className="px-4 py-1">{formatDate(product.expiry_date)}</td>
      <td className="px-4">
        <div className="flex h-full justify-between items-center p-2 border rounded-lg hover:bg-gray-100 transition duration-300">
          <Link
            to={`${product.product_id}`}
            state={product}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEye className="text-xl mr-2" />
          </Link>
          <Link
            to={`${product.product_id}/edit`}
            className="text-green-500 hover:text-green-700"
          >
            <FaPen className="text-xl mr-2" />
          </Link>
          <vendorComponents.DeleteProduct
            product_id={product.product_id}
            iconOnly
            onSuccess={handleDeleteSuccess}
          />
        </div>
      </td>
    </tr>
  );
};
