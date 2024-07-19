import { ecommerceSergeApi } from './index';
import { IProduct, ProductData } from '../types';
import { Category } from '../types/category.types';

interface DeleteProductImageParams {
  productId: string;
  imageUrl: string;
  token: string;
}

interface UpdateProductFormData {
  name: string;
  description: string;
  price: number;
  category_name: string;
  expiry_date: string;
  image_url: string[];
  quantity: number;
  discount: number;
}

interface UpdateProductParams {
  productId: string;
  token: string;
  UpdateProductFormData: UpdateProductFormData;
}

const productApi = ecommerceSergeApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: ({ token, product }) => ({
        url: 'api/v1/product/create',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        credentials: 'include',
        body: product,
      }),
    }),
    getAllProducts: builder.query<
      { success: boolean; message: string; data: IProduct[] },
      void
    >({
      query: () => 'api/v1/products/list',
    }),
    searchProducts: builder.mutation<
      IProduct[],
      { name: string; minPrice: number; maxPrice: number; category: string }
    >({
      query: ({ name, minPrice, maxPrice, category }) => ({
        url: 'api/v1/products/search',
        method: 'post',
        body: { name, minPrice, maxPrice, category },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getAllCategories: builder.query<
      { success: boolean; message: string; data: Category[] },
      void
    >({
      query: () => 'api/v1/categories/all',
    }),
    deleteProduct: builder.mutation({
      query: ({ product_id, token }) => ({
        url: `api/v1/product/${product_id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }),
    }),
    getProductById: builder.mutation({
      query: ({ product_id, token }) => ({
        url: `api/v1/product/${product_id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }),
    }),
    getProductReviews: builder.mutation({
      query: ({ product_id, token }) => ({
        url: `api/v1/buyer/review/${product_id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }),
    }),
    addProductToWishlist: builder.mutation({
      query: ({ product_id, token }) => ({
        url: `api/v1/wishlist/${product_id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }),
    }),
    getWishlist: builder.mutation({
      query: (token) => ({
        url: `api/v1/wishlist`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }),
    }),
    addReview: builder.mutation({
      query: ({ product_id, token, review }) => ({
        url: `api/v1/buyer/review/${product_id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: review,
      }),
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: `api/v1/cart/clearcart`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getProduct: builder.query<
      ProductData,
      { token: string; productId: string }
    >({
      query: ({ token, productId }) => ({
        url: `/api/v1/product/${productId}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        credentials: 'include',
      }),
    }),
    deleteProductImage: builder.mutation<void, DeleteProductImageParams>({
      query: ({ productId, imageUrl, token }) => ({
        url: `/api/v1/product/${productId}/image`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageUrl }),
      }),
    }),
    updateProduct: builder.mutation<void, UpdateProductParams>({
      query: ({ productId, token, UpdateProductFormData }) => ({
        url: `/api/v1/product/${productId}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: UpdateProductFormData,
      }),
    }),
    getCategories: builder.query<unknown, string>({
      query: (token) => ({
        url: '/api/v1/categories/all',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        credentials: 'include',
      }),
    }),
    recommendedProducts: builder.mutation({
      query: ({ token, product_id }) => ({
        url: `api/v1/product/${product_id}/recommended`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useSearchProductsMutation,
  useGetAllCategoriesQuery,
  useDeleteProductMutation,
  useGetProductByIdMutation,
  useGetProductReviewsMutation,
  useAddProductToWishlistMutation,
  useGetWishlistMutation,
  useAddReviewMutation,
  useClearCartMutation,
  useDeleteProductImageMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useGetCategoriesQuery,
  useRecommendedProductsMutation,
} = productApi;
