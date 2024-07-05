// DeleteProduct.test.tsx

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DeleteProduct } from '../../src/components/vendorcomponents/DeleteProduct';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('DeleteProduct', () => {
  const renderComponent = (props: any = {}) =>
    render(
      <Provider store={store}>
        <Router>
          <DeleteProduct product_id="123" {...props} />
        </Router>
      </Provider>,
    );

  it('renders the delete button with the correct text and icon', () => {
    renderComponent();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders the delete button with the icon only', () => {
    renderComponent({ iconOnly: true });
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('renders the delete button with custom classes', () => {
    renderComponent({ customClasses: 'custom-class' });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('opens the confirmation modal when the delete button is clicked', () => {
    renderComponent();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Confirm Product Deletion')).toBeInTheDocument();
  });

  it('closes the confirmation modal when the overlay is clicked', () => {
    renderComponent();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const overlay = screen.getByText('Confirm Product Deletion').parentElement
      ?.parentElement;
    if (overlay) {
      fireEvent.click(overlay);
    }
    expect(
      screen.queryByText('Confirm Product Deletion'),
    ).not.toBeInTheDocument();
  });

  it('closes the confirmation modal when the cancel button is clicked', () => {
    renderComponent();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(
      screen.queryByText('Confirm Product Deletion'),
    ).not.toBeInTheDocument();
  });
});
