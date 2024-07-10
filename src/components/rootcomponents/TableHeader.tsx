import {
  cartTableHeaderItems,
  CartTableHeaderItem,
} from '../../data/CartTableHeader';

const TableHeader = () => {
  return (
    <thead>
      <tr className="w-full border-b ">
        {cartTableHeaderItems.map((item: CartTableHeaderItem) => (
          <th
            key={item.id}
            className={`py-1 px-4 text-left text-slate-500 font-outfit font-light ${
              item.id === 'email' || item.id === 'image' || item.id === 'price'
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
};

export default TableHeader;
