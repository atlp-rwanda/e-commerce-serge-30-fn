import { ecommerceSergeApi } from "./index";
const authApi = ecommerceSergeApi.injectEndpoints({
    endpoints:builder =>({
        loginUser: builder.mutation({
            query: credentials => ({
            url: `api/v1/auth/login`,
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: credentials,
            }),
        }),
        forgotPassword: builder.mutation<{ message: string }, { email: string }>({
            query: (body) => ({
              url: `api/v1/auth/forgot-password`,
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body,
            }),
          }),
    })
})
export const { useLoginUserMutation, useForgotPasswordMutation } = authApi
;