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
  }),
});

export const { useDeleteProductMutation } = productApi;
