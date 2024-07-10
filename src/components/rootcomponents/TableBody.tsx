import React from 'react';
import { CartItem } from '../../types/Product.types';
import { ProductRow } from './ProductRow';

export interface TableBodyProps {
  products: CartItem[];
}

export const TableBody: React.FC<TableBodyProps> = ({ products }) => (
  <tbody>
    {products.map((product) => (
      <ProductRow key={product.productId} product={product} />
    ))}
  </tbody>
);
