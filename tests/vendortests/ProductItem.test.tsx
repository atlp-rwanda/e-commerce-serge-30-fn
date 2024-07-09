// ProductItem.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductItem from '../../src/pages/vendorpages/ProductItem'; // Adjust the path as needed
import { IProduct } from '../../src/types/Product.types'; // Adjust the path as needed
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
// Mocking the useLocation hook

describe('ProductItem UI component', () => {
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
            <Route path="/" element={<ProductItem />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  };

  test('renders product main image and thumbnails', () => {
    renderComponent();

    // Main image should be displayed
    const mainImage = screen.getByAltText('Product Preview');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', product.image_url[0]);

    // Thumbnails should be displayed
    product.image_url.forEach((url, index) => {
      const thumbnail = screen.getByAltText(`Product Thumbnail ${index + 1}`);
      expect(thumbnail).toBeInTheDocument();
      expect(thumbnail).toHaveAttribute('src', url);
    });
  });

  test('renders product details correctly', () => {
    renderComponent();

    // Check product name
    expect(screen.getByText(product.name)).toBeInTheDocument();

    // Check product description
    expect(screen.getByText(product.description)).toBeInTheDocument();

    // Check product price
    expect(
      screen.getByText(`$${product.price.toFixed(2)}`),
    ).toBeInTheDocument();

    // Check product quantity
    expect(screen.getByText(`Stock: ${product.quantity}`)).toBeInTheDocument();

    // Check product discount
    expect(
      screen.getByText(`Discount: ${product.discount}%`),
    ).toBeInTheDocument();

    // Check product expiry date
    const expiryDate = new Date(product.expiry_date).toLocaleDateString();
    expect(screen.getByText(`Expiry Date: ${expiryDate}`)).toBeInTheDocument();

    // Check product created date
    const createdDate = new Date(product.createdAt).toLocaleDateString();
    expect(
      screen.getByText(`Created Date: ${createdDate}`),
    ).toBeInTheDocument();
  });

  test('renders update and delete buttons', () => {
    renderComponent();

    // Check update button
    expect(screen.getByRole('button', { name: /Update/i })).toBeInTheDocument();

    // Check delete button
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });

  test('displays image in the main view when thumbnail is clicked', () => {
    renderComponent();

    // Main image should be initially set to the first image URL
    const mainImage = screen.getByAltText('Product Preview');
    expect(mainImage).toHaveAttribute('src', product.image_url[0]);

    // Click the second thumbnail
    const secondThumbnail = screen.getByAltText('Product Thumbnail 2');
    fireEvent.click(secondThumbnail);

    // The main image should now display the second image URL
    expect(mainImage).toHaveAttribute('src', product.image_url[1]);
  });
});
