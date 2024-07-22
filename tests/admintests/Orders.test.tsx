import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { MemoryRouter as Router } from 'react-router-dom';
import React from 'react';
import Orders from '../../src/pages/adminpages/Orders';
import { useFetchAllOrdersQuery } from '../../src/service/OrderApi';
import { vi } from 'vitest';

vi.mock('../../src/service/OrderApi', () => ({
  useFetchAllOrdersQuery: vi.fn(),
}));

describe('Orders Component', () => {
  beforeEach(() => {
    useFetchAllOrdersQuery.mockReturnValue({
      data: {
        success: true,
        message: '',
        data: [
          {
            id: '1',
            phone: '1234567890',
            status: 'pending',
            totalPrice: 100,
          },
          {
            id: '2',
            phone: '0987654321',
            status: 'delivered',
            totalPrice: 200,
          },
        ],
      },
      isLoading: false,
      isError: false,
    });
  });

  test('renders orders table with headers', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Orders />
          </Router>
        </Provider>
      </div>,
    );

    expect(screen.getByText(/Order ID/i)).toBeTruthy();
    expect(screen.getByText(/Customer Phone Number/i)).toBeTruthy();
    expect(screen.getByText(/Status/i)).toBeTruthy();
    expect(screen.getByText(/Amount/i)).toBeTruthy();
  });
  test('renders loading state', () => {
    useFetchAllOrdersQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Orders />
          </Router>
        </Provider>
      </div>,
    );

    expect(screen.getByText(/Loading orders.../i)).toBeTruthy();
  });

  test('renders error state', () => {
    useFetchAllOrdersQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Orders />
          </Router>
        </Provider>
      </div>,
    );

    expect(screen.getByText(/Failed to fetch orders. Please try again later./i)).toBeTruthy();
  });
});
