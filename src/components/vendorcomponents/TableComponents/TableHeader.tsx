// components/TableHeader.tsx
import { tableHeaderItems, TableHeaderItem } from '../../../data';

export const TableHeader: React.FC = () => (
  <thead>
    <tr className="w-full border-b">
      {tableHeaderItems.map((item: TableHeaderItem) => (
        <th key={item.id} className="py-1 px-4 text-left">
          {item.label}
        </th>
      ))}
    </tr>
  </thead>
);
