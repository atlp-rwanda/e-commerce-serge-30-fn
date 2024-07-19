import { createBrowserRouter } from 'react-router-dom';
import * as authPages from '../../src/pages/index';
import * as Layouts from '../layouts/index';
import * as Pages from '../pages/index';
import { Users } from '../pages/adminpages/index';
import TwoFactorAuth from '../pages/auth/TwoFactorAuth';
import { ForgotPassword } from '../pages/authpages/ForgotPassword';
import { ResetPassword } from '../pages/authpages/ResetPassword';
import Shop from '../pages/rootpages/Shop';
import { Product, ProductItem } from '../pages/vendorpages';
import BillingDetails from '../components/usercomponents/BillingDetails';
import PaymentSuccess from '../components/usercomponents/PaymentSuccess';
import PaymentFailure from '../components/usercomponents/PaymentFailure';
import PaymentsPage from '../pages/userPages/PaymentList';
import Cart from '../pages/rootpages/Cart';
import { ProductDetails } from '../components/rootcomponents/ProductDetails';
import * as userPages from '../pages/userPages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts.RootLayout />,
    children: [
      { index: true, element: <Pages.HomePage /> },
      { path: '/new', element: <Pages.AddProducts /> },
      { path: '/cart', element: <Cart /> },
      { path: '/shop', element: <Shop /> },
      { path: '/product/:productId', element: <ProductDetails /> },

      { path: '/billing-details', element: <BillingDetails /> },
      { path: '/payment/success', element: <PaymentSuccess /> },
      { path: '/payment/failure', element: <PaymentFailure /> },
      {
        path: '/payment/all',
        element: <PaymentsPage />,
      },
      { path: '*', element: <Pages.NotFoundPage /> },
    ],
  },
  {
    path: 'auth',
    element: <Layouts.AuthLayout />,
    children: [
      { path: 'login', index: true, element: <Pages.LoginPage /> },
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
    element: <Layouts.UserLayout />,
    children: [
      { path: 'me', element: <authPages.UserSettings /> },
      { path: 'orders/all', element: <userPages.OrderPage /> },
      { path: 'orders/:id', element: <userPages.SingleOrder /> },
    ],
  },
  {
    path: 'vendor',
    element: <Layouts.VendorLayout />,
    children: [
      {
        path: 'products',
        element: <Product />,
      },
      {
        path: 'products/:id',
        element: <ProductItem />,
      },
      {
        path: 'products/new',
        element: <Pages.AddProducts />,
      },
    ],
  },
  {
    path: 'admin',
    element: <Layouts.AdminLayout />,
    children: [{ path: 'users', element: <Users /> }],
  },
]);
