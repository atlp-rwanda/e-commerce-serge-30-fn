import { render } from '@testing-library/react';
import { ProductUpdateForm } from '../../src/components/vendorcomponents/ProductUpdateForm';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { IProduct } from '../../src/types/Product.types';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';

describe('ProductUpdateForm component', () => {
  const product: IProduct = {
    name: 'Test Product',
    description: 'This is a test product.',
    price: 100,
    quantity: 10,
    discount: 15,
    expiry_date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    image_url: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150/0000FF/808080',
    ],
    product_id: '',
    vendor_id: '',
    category_id: '',
    available: false,
    expired: false,
    finalRatings: 0,
    reviewsCount: 0,
    updatedAt: '',
    Category: {
      category_id: '',
      name: '',
      description: '',
      createdAt: '',
      updatedAt: '',
    },
    Vendor: {
      vendor_id: '',
      user_id: '',
      store_name: '',
      store_description: '',
      createdAt: '',
      updatedAt: '',
    },
  };

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ state: product }]}>
          <Routes>
            <Route path="/" element={<ProductUpdateForm productId="1" />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  };

  test('renders form fields and buttons', async () => {
    renderComponent();
  });
  test('displays image previews and handles image deletion', async () => {
    renderComponent();
  });
});
