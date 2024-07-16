import { ecommerceSergeApi } from './index';
const productApi = ecommerceSergeApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useDeleteProductMutation,
  useAddProductToWishlistMutation,
  useGetWishlistMutation,
  useClearCartMutation,
} = productApi;
