export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface Product {
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
  Category: Category;
  Vendor: Vendor;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  createdAt: string;
  updatedAt: string;
  Product: Product;
}
