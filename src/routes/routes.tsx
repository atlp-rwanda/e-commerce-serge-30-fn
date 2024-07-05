import { createBrowserRouter } from 'react-router-dom';
import * as authPages from '../../src/pages/index';
import {
  AdminLayout,
  AuthLayout,
  RootLayout,
  UserLayout,
  VendorLayout,
} from '../layouts';
import { HomePage, LoginPage, NotFoundPage } from '../pages';
import { Users } from '../pages/adminpages/index';
import TwoFactorAuth from '../pages/auth/TwoFactorAuth';
import { ForgotPassword } from '../pages/authpages/ForgotPassword';
import { ResetPassword } from '../pages/authpages/ResetPassword';
import AllProducts from '../pages/rootpages/AllProducts';
import NewProduct from '../pages/rootpages/NewProduct';
import { Product, ProductItem } from '../pages/vendorpages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/new', element: <NewProduct /> },
      { path: '/shop', element: <AllProducts /> },

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
      { path: 'two-factor-auth', element: <TwoFactorAuth /> },
      { path: 'signup', element: <authPages.Signup /> },
      { path: 'verify', element: <authPages.VerificationPage /> },
      { path: 'verifyFailed', element: <authPages.VerificationFail /> },
      { path: 'renew-password', element: <authPages.RequestPwdChange /> },
    ],
  },
  {
    path: 'user',
    element: <UserLayout />,
    children: [{ path: 'usersettings', element: <authPages.UserSettings /> }],
  },
  {
    path: 'vendor',
    element: <VendorLayout />,
    children: [
      {
        path: 'products',
        element: <Product />,
      },
      {
        path: 'products/:id',
        element: <ProductItem />,
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [{ path: 'users', element: <Users /> }],
  },
]);
