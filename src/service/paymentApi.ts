import { ecommerceSergeApi } from './index';
import { Payment } from '../types/payment.types';

const paymentApi = ecommerceSergeApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.mutation<Payment[], void>({
      query: () => ({
        url: 'api/v1/payment/all',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
  }),
});

export const { useGetPaymentsMutation } = paymentApi;
