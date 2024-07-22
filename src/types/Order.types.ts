import { IProduct } from './Product.types';
export interface Order {
  id: string;
  cartId: string;
  status: string;
  address: string;
  phone: string;
  zipCode: string;
  city: string;
  country: string;
  userId: string;
  totalPrice: number;
  expectedDeliveryDate: string;
  products: IProduct[];
  createdAt: string;
  updatedAt: string;
  customer: string;
  total: number;
}
