import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useCreateOrderMutation } from '../../src/service/OrderApi';
import { vi } from 'vitest';
import React from 'react';
import BillingDetails from '../../src/components/usercomponents/BillingDetails';
import { ToastContainer } from 'react-toastify';

vi.mock('../../src/service/OrderApi');

const mockUseCreateOrderMutation =
  useCreateOrderMutation as jest.MockedFunction<typeof useCreateOrderMutation>;

describe('BillingDetails', () => {
  beforeEach(() => {
    mockUseCreateOrderMutation.mockReturnValue([
      vi.fn(),
      {
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: '',
        reset: vi.fn(),
      },
    ]);
  });

  const renderComponent = (createOrderMock = vi.fn()) =>
    render(
      <MemoryRouter>
        <BillingDetails createOrder={createOrderMock} />
        <ToastContainer />
      </MemoryRouter>,
    );

  it('should render the form and handle input changes', () => {
    renderComponent();

    expect(screen.getByText('Billing Details')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Country')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Zip Code')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Expected Delivery Date'),
    ).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Address'), {
      target: { value: '123 kanombe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Country'), {
      target: { value: 'Kigali' },
    });
    fireEvent.change(screen.getByPlaceholderText('City'), {
      target: { value: 'Kigali city' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone'), {
      target: { value: '2507888388383' },
    });
    fireEvent.change(screen.getByPlaceholderText('Zip Code'), {
      target: { value: '00000' },
    });
    fireEvent.change(screen.getByPlaceholderText('Expected Delivery Date'), {
      target: { value: '2024-09-05' },
    });

    expect(screen.getByDisplayValue('123 kanombe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Kigali')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Kigali city')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2507888388383')).toBeInTheDocument();
    expect(screen.getByDisplayValue('00000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024-09-05')).toBeInTheDocument();
  });

  it('should show error messages on validation failure', async () => {
    renderComponent();

    fireEvent.submit(screen.getByText('Place Order'));

    await waitFor(() => {
      expect(screen.getByText('Address is required')).toBeInTheDocument();
      expect(screen.getByText('Country is required')).toBeInTheDocument();
    });
  });
});
