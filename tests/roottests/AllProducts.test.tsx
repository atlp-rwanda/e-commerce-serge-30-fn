import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { AllProducts } from '../../src/components/rootcomponents/searchComponents/AllProducts';
import { Product } from '../../src/service/productApi';
describe('All products Component', () => {
  it('should return no product div when empty array of products', () => {
    const products: Product[] = [];
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AllProducts products={products} />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId('noProducts')).toBeInTheDocument();
  });

  it('should return a div of products when products array containes something', () => {
    const mockproducts: Product[] = [
      {
        product_id: '1',
        vendor_id: '1',
        category_id: '1',
        name: 'Example Product',
        description: 'This is an example product.',
        price: 10.0,
        quantity: 100,
        image_url: ['url', 'https://example.com/image2.jpg'],
        discount: 0,
        expiry_date: '1',
        available: true,
        expired: false,
        finalRatings: 5,
        reviewsCount: 10,
        createdAt: '1',
        updatedAt: '1',
        Category: {
          category_id: '1',
          name: '1',
          description: '1',
          createdAt: '1',
          updatedAt: '1',
        },
        Vendor: {
          vendor_id: '1',
          user_id: '1',
          store_name: '1',
          store_description: '1',
          createdAt: '1',
          updatedAt: '2',
        },
      },
    ];
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AllProducts products={mockproducts} />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });
});
