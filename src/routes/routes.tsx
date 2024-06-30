import { createBrowserRouter } from 'react-router-dom';
import { HomePage, LoginPage, NotFoundPage } from '../pages';
import {
  RootLayout,
  AdminLayout,
  AuthLayout,
  VendorLayout,
  UserLayout,
} from '../layouts';
import { ResetPassword } from '../pages/authpages/ResetPassword';
import { ForgotPassword } from '../pages/authpages/ForgotPassword';
import * as authPages from '../../src/pages/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', index: true, element: <LoginPage /> },
      { path: 'reset-password/:token', element: <ResetPassword /> },
      { path: 'forgotPassword', element: <ForgotPassword /> },
      { path: 'signup', element: <authPages.Signup /> },
      { path: 'verify', element: <authPages.VerificationPage /> },
      { path: 'verifyFailed', element: <authPages.VerificationFail /> },
    ],
  },
  {
    path: 'user',
    element: <UserLayout />,
    children: [
      { path: 'usersettings', element: <authPages.UserSettings /> },
    ],
  },
  {
    path: 'vendor',
    element: <VendorLayout />,
    children: [],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [],
  },
]);
