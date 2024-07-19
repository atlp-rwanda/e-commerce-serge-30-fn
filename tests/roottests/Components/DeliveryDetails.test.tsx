import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import  Deliverydetails from '../../../src/components/rootcomponents/DeliveryDetails';
describe('Deliverydetails', () => {
  it('renders the delivery details correctly', () => {
    render(<Deliverydetails />);

    expect(screen.getByText('Free Delivery')).toBeInTheDocument();
    expect(
      screen.getByText('Enter your postal code for Delivery Availability'),
    ).toBeInTheDocument();

    expect(screen.getByText('Return Delivery')).toBeInTheDocument();
    expect(
      screen.getByText('Free 30 Days Delivery Returns.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });
});
