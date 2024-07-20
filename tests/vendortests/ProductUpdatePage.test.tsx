import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store'; // Import your configured Redux store
import { ProductUpdatePage } from '../../src/pages/vendorpages/ProductUpdatePage';

describe('ProductUpdatePage Component', () => {
  it('renders ProductUpdateForm with correct productId', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/vendor/products/product1/update']}>
          <Routes>
            <Route
              path="/vendor/products/:productId/update"
              element={<ProductUpdatePage />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  });
});
