import { render, fireEvent, waitFor } from '@testing-library/react';
import BillingDetails from '../../src/components/usercomponents/BillingDetails';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { vi } from 'vitest';

vi.mock('../../src/service/OrderApi', () => ({
  useCreateOrderMutation: vi.fn(),
  useCreatePaymentSessionMutation: vi.fn(),
}));

import {
  useCreateOrderMutation,
  useCreatePaymentSessionMutation,
} from '../../src/service/OrderApi';
const mockCreateOrder = useCreateOrderMutation as jest.Mock;
const mockCreatePaymentSession = useCreatePaymentSessionMutation as jest.Mock;

describe('BillingDetails Component', () => {
  beforeEach(() => {
    mockCreateOrder.mockReturnValue([
      vi.fn().mockResolvedValue({ data: { success: true, data: { id: 1 } } }),
      { isLoading: false, isSuccess: true, isError: false },
    ]);

    mockCreatePaymentSession.mockReturnValue([
      vi.fn().mockResolvedValue({
        data: { session: { url: 'http://payment.url' } },
      }),
    ]);
  });

  test('renders all form fields', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <BillingDetails />
          </Router>
        </Provider>
      </div>,
    );

    const addressInput = document.querySelector('#address') as HTMLInputElement;
    const countryInput = document.querySelector('#country') as HTMLInputElement;
    const cityInput = document.querySelector('#city') as HTMLInputElement;
    const phoneInput = document.querySelector('#phone') as HTMLInputElement;
    const zipCodeInput = document.querySelector('#zipCode') as HTMLInputElement;
    const expectedDeliveryDateInput = document.querySelector(
      '#expectedDeliveryDate',
    ) as HTMLInputElement;

    const bankRadio = document.querySelector('#bank') as HTMLInputElement;
    const mobileMoneyRadio = document.querySelector(
      '#mobileMoney',
    ) as HTMLInputElement;

    expect(addressInput).not.toBeNull();
    expect(countryInput).not.toBeNull();
    expect(cityInput).not.toBeNull();
    expect(phoneInput).not.toBeNull();
    expect(zipCodeInput).not.toBeNull();
    expect(expectedDeliveryDateInput).not.toBeNull();

    expect(bankRadio).not.toBeNull();
    expect(mobileMoneyRadio).not.toBeNull();
  });

  test('accepts and updates input values', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <BillingDetails />
          </Router>
        </Provider>
      </div>,
    );

    fireEvent.change(document.querySelector('#address') as HTMLInputElement, {
      target: { value: '123 Main St' },
    });
    fireEvent.change(document.querySelector('#country') as HTMLInputElement, {
      target: { value: 'USA' },
    });
    fireEvent.change(document.querySelector('#city') as HTMLInputElement, {
      target: { value: 'New York' },
    });
    fireEvent.change(document.querySelector('#phone') as HTMLInputElement, {
      target: { value: '1234567890' },
    });
    fireEvent.change(document.querySelector('#zipCode') as HTMLInputElement, {
      target: { value: '10001' },
    });
    fireEvent.change(
      document.querySelector('#expectedDeliveryDate') as HTMLInputElement,
      { target: { value: '2024-12-31' } },
    );

    expect((document.querySelector('#address') as HTMLInputElement).value).toBe(
      '123 Main St',
    );
    expect((document.querySelector('#country') as HTMLInputElement).value).toBe(
      'USA',
    );
    expect((document.querySelector('#city') as HTMLInputElement).value).toBe(
      'New York',
    );
    expect((document.querySelector('#phone') as HTMLInputElement).value).toBe(
      '1234567890',
    );
    expect((document.querySelector('#zipCode') as HTMLInputElement).value).toBe(
      '10001',
    );
    expect(
      (document.querySelector('#expectedDeliveryDate') as HTMLInputElement)
        .value,
    ).toBe('2024-12-31');
  });

  test('handles form submission with valid data', async () => {
    const originalLocation = global.location;
    delete (global as any).location;
    (global as any).location = { href: '' };

    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <BillingDetails />
          </Router>
        </Provider>
      </div>,
    );

    fireEvent.change(document.querySelector('#address') as HTMLInputElement, {
      target: { value: '123 Main St' },
    });
    fireEvent.change(document.querySelector('#country') as HTMLInputElement, {
      target: { value: 'USA' },
    });
    fireEvent.change(document.querySelector('#city') as HTMLInputElement, {
      target: { value: 'New York' },
    });
    fireEvent.change(document.querySelector('#phone') as HTMLInputElement, {
      target: { value: '1234567890' },
    });
    fireEvent.change(document.querySelector('#zipCode') as HTMLInputElement, {
      target: { value: '10001' },
    });
    fireEvent.change(
      document.querySelector('#expectedDeliveryDate') as HTMLInputElement,
      { target: { value: '2024-12-31' } },
    );

    fireEvent.click(document.querySelector('#bank') as HTMLInputElement);

    const formElement = document.querySelector('form');
    if (!formElement) {
      throw new Error('Form element not found');
    }
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect((global as any).location.href).toBe('http://payment.url');
    });

    global.location = originalLocation;
  });

  test('displays error messages for invalid form data', async () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <BillingDetails />
          </Router>
        </Provider>
      </div>,
    );

    fireEvent.click(document.querySelector('#bank') as HTMLInputElement);

    const formElement = document.querySelector('form');
    if (!formElement) {
      throw new Error('Form element not found');
    }
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(
        document.querySelector('#address')?.parentElement?.querySelector('p')
          ?.innerHTML,
      ).toBe('Address is required');
    });
  });
});
