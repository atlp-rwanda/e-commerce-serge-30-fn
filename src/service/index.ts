import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE_URL = import.meta.env.VITE_DEPLOYED_URL || '';
export const ecommerceSergeApi = createApi({
  reducerPath:"ecommerceSergeApi",
  baseQuery: fetchBaseQuery({
    baseUrl:API_BASE_URL,
  }),
  endpoints: () => ({}),
})
