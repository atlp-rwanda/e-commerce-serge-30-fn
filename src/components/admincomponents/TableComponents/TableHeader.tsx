import React from 'react';
import { TableHeaderItem, tableHeaderItems } from '../../../data/admin/index';

export const TableHeader: React.FC = () => (
  <thead>
    <tr className="w-full border-b">
      {tableHeaderItems.map((item: TableHeaderItem) => (
        <th
          key={item.id}
          className={`py-1 px-4 text-left ${
            item.id === 'createdAt' ||
            item.id === 'email' ||
            item.id === 'image' ||
            item.id === 'status'
              ? 'max-tablet:hidden'
              : ''
          }`}
        >
          {item.label}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
