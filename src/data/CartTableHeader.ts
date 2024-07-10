export type CartTableHeaderItem = {
  id: string;
  label: string;
};

export const cartTableHeaderItems: CartTableHeaderItem[] = [
  { id: 'image', label: 'Image' },
  { id: 'name', label: 'Name' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'price', label: 'Price' },
];
