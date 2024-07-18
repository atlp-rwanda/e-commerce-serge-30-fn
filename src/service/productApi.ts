import { ecommerceSergeApi } from './index';
import { IProduct } from '../types';
import { Category } from '../types/category.types';

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
} = productApi;
