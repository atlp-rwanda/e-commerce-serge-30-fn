import { ecommerceSergeApi } from './index';
interface Profile {
  birthdate: string;
  createdAt: string;
  email: string;
  gender: string;
  id: string;
  location: string;
  preferred_currency: string;
  preferred_language: string;
  updatedAt: string;
  userId: string;
  username: string;
}
interface User {
  active: boolean;
  createdAt: string;
  email: string;
  emailVerificationToken: string;
  emailVerificationTokenExpiration: string;
  firstname: string;
  google_id: string | null;
  google_token: string | null;
  image_url: string | null;
  lastname: string;
  resetToken: string | null;
  resetTokenExpiration: string | null;
  role: 'ADMIN' | 'USER' | 'VENDOR';
  updatedAt: string;
  user_id: string;
  username: string;
  verified: boolean;
  profile: Profile;
}
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
    assignRole: builder.mutation<
      { message: string },
      { id: string; token: string; role: string }
    >({
      query: ({ id, token, role }) => ({
        url: `api/v1/role/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`,
        },
        body: { role },
      }),
    }),
    disableAccount: builder.mutation<
      { message: string },
      { id: string; token: string; }
    >({
      query: ({ id, token }) => ({
        url: `api/v1/admin/disable/${id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`,
        },
      }),
    }),
    userProfile: builder.query<User, void>({
      query: () => {
        const token = localStorage.getItem('token');
        return {
          url: 'api/v1/users/profile',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        };
      },
    }),
    updateProfile: builder.mutation<User, Partial<Profile>>({
      query: (updatedProfile) => {
        const token = localStorage.getItem('token');
        return {
          url: 'api/v1/users/profile',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: updatedProfile,
        };
      },
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
  useAssignRoleMutation,
  useDisableAccountMutation,
  useUserProfileQuery,
  useUpdateProfileMutation
} = authApi;

