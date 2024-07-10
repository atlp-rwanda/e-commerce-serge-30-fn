import { ecommerceSergeApi } from './index';
const getCategoriesApi = ecommerceSergeApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.mutation({
      query: ({ token }) => ({
        url: 'api/v1/categories/all',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllCategoriesMutation } = getCategoriesApi;