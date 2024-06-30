import { ecommerceSergeApi } from './index';
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
        updatePassword: builder.mutation({
          query: ({ userId, userCredentials }) => ({
            url: `api/v1/auth/${userId}/update-password`,
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: {
              oldPassword: userCredentials.oldPassword,
              newPassword: userCredentials.newPassword,
              confirmPassword: userCredentials.confirmNewPassword,
            },
          }),
        }),
    })
})
export const { useLoginUserMutation, useForgotPasswordMutation, useUpdatePasswordMutation  } = authApi
;
