import { createBrowserRouter } from 'react-router-dom';
import { HomePage, LoginPage, NotFoundPage } from '../pages';
import {
  RootLayout,
  AdminLayout,
  AuthLayout,
  VendorLayout,
  UserLayout,
} from '../layouts';
import SignupPage from '../pages/authpages/SignupPage';

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
      { path: 'signup', element: <SignupPage /> },
    ],
  },
  {
    path: 'user',
    element: <UserLayout />,
    children: [],
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
