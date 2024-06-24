// components/TableBody.tsx
import React from 'react';
import { IProduct } from '../../../types';
import { ProductRow } from './ProductRow';

export interface TableBodyProps {
  products: IProduct[];
  formatDate: (_date: string) => string;
}

export const TableBody: React.FC<TableBodyProps> = ({
  products,
  formatDate,
}) => (
  <tbody>
    {products.map((product) => (
      <ProductRow
        key={product.product_id}
        product={product}
        formatDate={formatDate}
      />
    ))}
  </tbody>
);
