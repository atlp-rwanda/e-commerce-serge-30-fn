import { ecommerceSergeApi } from './index';
import { Order } from '../types';
import { IOrder, IOrderResponse, IProduct} from '../types/Product.types';
import { IPayment } from '../types/index';
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      }),
    }),
    getAllOrders: builder.query<
      { success: boolean; message: string; data: Order[] },
      void
    >({
      query: () => ({
        url: 'api/v1/orders/all',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      }),
    }),
    getSingleOrder: builder.query<{}, string>({
      query: (id) => ({
        url: `api/v1/orders/${id}/status`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      }),
    }),
    createPaymentSession: builder.mutation<any, { orderId: string }>({
      query: (paymentDetails) => ({
        url: 'api/v1/payment',
        method: 'POST',
        body: paymentDetails,
      }),
    }),
    fetchAllOrders: builder.query<IOrder[], void>({
      query: () => ({
        url: 'api/v1/orders/all',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      }),
    }),
    getProductById: builder.query<IProduct, string>({
      query: (productId) => ({
        url: `api/v1/product/${productId}`,
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      }),
    }),
    fetchAllPayments: builder.query<{ data: IPayment[] }, void>({
      query: () => ({
        url: 'api/v1/payment/all',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  
  useCreatePaymentSessionMutation,useCreateOrderMutation, useFetchAllOrdersQuery, useGetProductByIdQuery, useFetchAllPaymentsQuery ,
} = orderApi;
