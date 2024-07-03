import { ecommerceSergeApi } from './index';
const authApi = ecommerceSergeApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `api/v1/auth/login`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: `api/v1/auth/forgot-password`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `api/v1/auth/logout`,
        method: 'GET',
      }),
    }),
    sendOtp: builder.mutation({
      query: (email) => ({
        url: `api/v1/auth/send-verification-email`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: email,
      }),
    }),
    verifyCode: builder.mutation<
      { message: string },
      { email: string; code: string; tokens: string }
    >({
      query: ({ email, code, tokens }) => ({
        url: 'api/v1/auth/verify-authentication-code',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens}`,
        },
        body: { email, code },
      }),
    }),
    sendVerification: builder.mutation<
      { message: string },
      { email: string; tokens: string }
    >({
      query: ({ email, tokens }) => ({
        url: 'api/v1/auth/send-verification-email',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens}`,
        },
        body: { email },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ userId, userCredentials }) => ({
        url: `api/v1/auth/${userId}/update-password`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: {
          oldPassword: userCredentials.oldPassword,
          newPassword: userCredentials.newPassword,
          confirmPassword: userCredentials.confirmNewPassword,
        },
      }),
    }),
  }),
});
export const {
  useLoginUserMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useSendOtpMutation,
  useVerifyCodeMutation,
  useSendVerificationMutation,
  useUpdatePasswordMutation,
} = authApi;
