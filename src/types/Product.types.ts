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
