import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { MemoryRouter as Router } from 'react-router-dom';
import React from 'react';
import Payments from '../../src/pages/adminpages/Payments';
import { useFetchAllPaymentsQuery } from '../../src/service/OrderApi';
import { vi } from 'vitest';

// Mock the useFetchAllPaymentsQuery hook
vi.mock('../../src/service/OrderApi', () => ({
  useFetchAllPaymentsQuery: vi.fn(),
}));

describe('Payments Component', () => {
  beforeEach(() => {
    useFetchAllPaymentsQuery.mockReturnValue({
      data: [
        {
          id: '1',
          createdAt: '2023-03-15T12:00:00Z',
          payment_method: 'Credit Card',
          payment_status: 'Completed',
          amount: 100,
        },
        {
          id: '2',
          createdAt: '2023-03-14T12:00:00Z',
          payment_method: 'PayPal',
          payment_status: 'Pending',
          amount: 200,
        },
      ],
      isLoading: false,
      isError: false,
    });
  });

  test('renders payments table with headers', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Payments />
          </Router>
        </Provider>
      </div>,
    );

    expect(screen.getByText(/Date/i)).toBeTruthy();
    expect(screen.getByText(/Payment Method/i)).toBeTruthy();
    expect(screen.getByText(/Status/i)).toBeTruthy();
    expect(screen.getByText(/Amount/i)).toBeTruthy();
  });
  test('renders loading state', () => {
    useFetchAllPaymentsQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Payments />
          </Router>
        </Provider>
      </div>,
    );

    expect(screen.getByText(/Loading payments.../i)).toBeTruthy();
  });

  test('renders error state', () => {
    useFetchAllPaymentsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Payments />
          </Router>
        </Provider>
      </div>,
    );

    expect(screen.getByText(/Failed to fetch payments. Please try again later./i)).toBeTruthy();
  });
});
