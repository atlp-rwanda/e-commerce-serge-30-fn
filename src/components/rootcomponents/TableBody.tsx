import React from 'react';
import { CartItem } from '../../types/Product.types';
import { ProductRow } from './ProductRow';

export interface TableBodyProps {
  products: (CartItem | null)[];
}

export const TableBody: React.FC<TableBodyProps> = ({ products }) => (
  <tbody>
    {products
      .filter((product): product is CartItem => product !== null)
      .map((product) => (
        <ProductRow key={product.productId} product={product} />
      ))}
  </tbody>
);
