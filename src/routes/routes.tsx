import { createBrowserRouter } from 'react-router-dom';
import * as authPages from '../../src/pages/index';
import * as Layouts from '../layouts/index';
import * as Pages from '../pages/index';
import { Users } from '../pages/adminpages/index';
import { Orders, Payments, Vendors } from '../pages/adminpages';
import TwoFactorAuth from '../pages/auth/TwoFactorAuth';
import { ForgotPassword } from '../pages/authpages/ForgotPassword';
import { ResetPassword } from '../pages/authpages/ResetPassword';
import Shop from '../pages/rootpages/Shop';
import Home from '../pages/userPages/Home';
import Chat from '../pages/userPages/Chat';
import { ProductUpdatePage } from '../pages/vendorpages/ProductUpdatePage';
import { NotificationPage } from '../pages/userPages/NotificationPage';
import * as userPages from '../pages/userPages';
import PaymentSuccess from '../components/usercomponents/PaymentSuccess';
import PaymentFailure from '../components/usercomponents/PaymentFailure';
import PaymentsPage from '../pages/userPages/PaymentList';
import { Product, ProductItem } from '../pages/vendorpages';
import BillingDetails from '../components/usercomponents/BillingDetails';
import Cart from '../pages/rootpages/Cart';
import { ProductDetails } from '../components/rootcomponents/ProductDetails';
import WishlistPage from '../pages/userPages/WishlistPage';
import StoreCollection from '../pages/vendorpages/StoreCollection';
import { VendorDashboard } from '../pages/vendor/VendorDashboard';

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
      { index: true, element: <Home /> },
      { path: 'me', element: <authPages.UserSettings /> },
      {
        path: 'notifications',
        element: <NotificationPage />,
      },
      { path: 'chat', element: <Chat /> },
      { path: 'orders/all', element: <userPages.OrderPage /> },
      { path: 'orders/:id', element: <userPages.SingleOrder /> },
      { path: 'wishlist', element: <WishlistPage /> },
      {
        path: 'payment/all',
        element: <PaymentsPage />,
      },
    ],
  },
  {
    path: 'vendor',
    element: <Layouts.VendorLayout />,
    children: [
      { index: true, element: <VendorDashboard /> },
      {
        path: 'products',
        element: <Product />,
      },
      {
        path: 'products/:id',
        element: <ProductItem />,
      },
      { path: 'products/:id/update', element: <ProductUpdatePage /> },
      {
        path: 'products/new',
        element: <Pages.AddProducts />,
      },
      { path: 'chat', element: <Chat /> },
      { path: 'store', element: <StoreCollection /> },
    ],
  },
  {
    path: 'admin',
    element: <Layouts.AdminLayout />,
    children: [
      { path: 'users', element: <Users /> },
      { path: 'chat', element: <Chat /> },
      { path: 'orders', element: <Orders /> },
      { path: 'products', element: <Payments /> },
      { path: 'vendors', element: <Vendors /> },
    ],
  },
]);
