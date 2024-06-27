import { ecommerceSergeApi } from './index';

const productsApi = ecommerceSergeApi.injectEndpoints({
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
  }),
});

export const { useCreateProductMutation } = productsApi;
