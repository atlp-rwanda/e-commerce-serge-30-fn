import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../redux/features/auth/authSlice';
import { RootState } from '../redux/store';
const API_BASE_URL = import.meta.env.VITE_DEPLOYED_URL || '';
export const ecommerceSergeApi = createApi({
  reducerPath: 'ecommerceSergeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = selectToken(state);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Authorization', ` ${token}`);
      }

      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
});
