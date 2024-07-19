import { ecommerceSergeApi } from './index';
import { IOrder, IOrderResponse } from '../types/Product.types';

const orderApi = ecommerceSergeApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      IOrderResponse,
      Omit<IOrder, 'order_id' | 'created_at' | 'updated_at'>
    >({
      query: (orderDetails) => ({
        url: 'api/v1/checkout',
        method: 'POST',
        body: orderDetails,
      }),
    }),
    createPaymentSession: builder.mutation<any, { orderId: string }>({
      query: (paymentDetails) => ({
        url: 'api/v1/payment',
        method: 'POST',
        body: paymentDetails,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useCreatePaymentSessionMutation } =
  orderApi;
