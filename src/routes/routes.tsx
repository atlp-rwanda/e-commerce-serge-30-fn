import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage, LoginPage, NotFoundPage } from '../pages';
import { RootLayout } from '../layouts';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

  
