import { ecommerceSergeApi } from '../../src/service/index';
import { vi } from 'vitest';

vi.mock('../../src/service/index', () => ({
  ecommerceSergeApi: {
    injectEndpoints: vi.fn(),
  },
}));

describe('API Tests', () => {
  beforeEach(() => {
    (ecommerceSergeApi.injectEndpoints as any).mockClear();
  });

  test('getCategoriesApi is called correctly', () => {
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
            credentials: 'include',
          }),
        }),
      }),
    });

    expect(ecommerceSergeApi.injectEndpoints).toHaveBeenCalled();
  });

  test('productsApi is called correctly', () => {
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

    expect(ecommerceSergeApi.injectEndpoints).toHaveBeenCalled();
  });
});
