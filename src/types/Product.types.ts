export interface IProduct {
  product_id: string;
  vendor_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string[];
  discount: number;
  expiry_date: string;
  available: boolean;
  expired: boolean;
  finalRatings: number;
  reviewsCount: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  Category: {
    category_id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  Vendor: {
    vendor_id: string;
    user_id: string;
    store_name: string;
    store_description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CartProduct {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}
export interface IOrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string[];
}
export interface IOrder {
  user_id?: string;
  total_amount?: number;
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status?: 'pending' | 'completed' | 'failed';
  payment_method?: string;
  shipping_address?: {
    address: string;
    city: string;
    country: string;
    zip_code: string;
  };
  phone?: string;
  expected_delivery_date?: string;
}
export interface IOrderResponse {
  success: boolean;
  message: string;
  data: {
    createdAt: string;
    updatedAt: string;
    id: string;
    status: string;
    address: string;
    country: string;
    city: string;
    phone: string;
    zipCode: string;
    expectedDeliveryDate: string;
    userId: string;
    totalPrice: number;
    cartId: string;
    products: IProduct[];
  };
}
export interface ProductData {
  product_id: string;
  vendor_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string[];
  discount: number;
  expiry_date: string;
  available: boolean;
  expired: boolean;
  finalRatings: number;
  reviewsCount: number;
  createdAt: string;
  updatedAt: string;
  Category: {
    category_id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  Vendor: {
    vendor_id: string;
    user_id: string;
    store_name: string;
    store_description: string;
    createdAt: string;
    updatedAt: string;
  };
  data: Product[];
  isLoading: boolean;
}
export interface Product {
  data: IProduct;
}

interface Category {
  category_id: string;
  name: string;
}
export interface CategoriesDatas {
  data: Category[];
  success: boolean;
  message: string;
}
