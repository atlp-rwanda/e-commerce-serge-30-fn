import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { router } from '../src/routes/routes';
import { store } from '../src/redux/store';
import { Provider } from 'react-redux';
export const navigateTo = (path: string) => {
  const routers = createMemoryRouter(router.routes, {
    initialEntries: [path],
  });

  render(
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>,
  );
};
