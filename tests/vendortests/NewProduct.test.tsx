import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddProducts } from '../../src/pages/vendorpages/addProducts';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import '../../src/service/productApi';

import { vi } from 'vitest';

vi.mock('../../src/service/productApi', () => ({
  useGetAllCategoriesQuery: vi.fn(),
  useCreateProductMutation: vi.fn(),
}));

import {
  useGetAllCategoriesQuery,
  useCreateProductMutation,
} from '../../src/service/productApi';
const mockGetAllCategories = useGetAllCategoriesQuery as jest.Mock;
const mockCreateProduct = useCreateProductMutation as jest.Mock;

describe('AddProducts Component', () => {
  beforeEach(() => {
    mockGetAllCategories.mockReturnValue({
      data: { data: [{ name: 'Category1' }, { name: 'Category2' }] },
      isLoading: false,
      isError: false,
    });

    mockCreateProduct.mockReturnValue([
      vi.fn().mockResolvedValue({ data: { success: true } }),
      { isLoading: false },
    ]);
  });

  test('renders add product form with all fields', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <AddProducts />
          </Router>
        </Provider>
      </div>,
    );

    expect(screen.getByPlaceholderText(/Enter product name/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Enter product price/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Enter quantity/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Enter discount/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Select expiry date/i)).toBeTruthy();
    expect(
      screen.getByPlaceholderText(/Enter product description/i),
    ).toBeTruthy();
    for (let i = 0; i < 8; i++) {
      expect(screen.getByPlaceholderText(`Image URL ${i + 1}`)).toBeTruthy();
    }
  });

  test('accepts valid product name input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <AddProducts />
          </Router>
        </Provider>
      </div>,
    );

    const productNameInput = screen.getByPlaceholderText(
      /Enter product name/i,
    ) as HTMLInputElement;
    fireEvent.change(productNameInput, { target: { value: 'Product1' } });

    expect(productNameInput.value).toBe('Product1');
  });

  test('accepts valid product price input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <AddProducts />
          </Router>
        </Provider>
      </div>,
    );

    const productPriceInput = screen.getByPlaceholderText(
      /Enter product price/i,
    ) as HTMLInputElement;
    fireEvent.change(productPriceInput, { target: { value: '100' } });

    expect(productPriceInput.value).toBe('100');
  });

  test('accepts valid quantity input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <AddProducts />
          </Router>
        </Provider>
      </div>,
    );

    const quantityInput = screen.getByPlaceholderText(
      /Enter quantity/i,
    ) as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: '10' } });

    expect(quantityInput.value).toBe('10');
  });

  test('accepts valid discount input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <AddProducts />
          </Router>
        </Provider>
      </div>,
    );

    const discountInput = screen.getByPlaceholderText(
      /Enter discount/i,
    ) as HTMLInputElement;
    fireEvent.change(discountInput, { target: { value: '5' } });

    expect(discountInput.value).toBe('5');
  });

  test('accepts valid expiry date input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <AddProducts />
          </Router>
        </Provider>
      </div>,
    );

    const expiryDateInput = screen.getByPlaceholderText(
      /Select expiry date/i,
    ) as HTMLInputElement;
    fireEvent.change(expiryDateInput, { target: { value: '2023-12-31' } });

    expect(expiryDateInput.value).toBe('2023-12-31');
  });

  test('accepts valid description input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <AddProducts />
          </Router>
        </Provider>
      </div>,
    );

    const descriptionInput = screen.getByPlaceholderText(
      /Enter product description/i,
    ) as HTMLTextAreaElement;
    fireEvent.change(descriptionInput, {
      target: { value: 'This is a great product' },
    });

    expect(descriptionInput.value).toBe('This is a great product');
  });
});
