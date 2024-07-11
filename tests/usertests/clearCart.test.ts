import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ClearCart } from '../../src/components/usercomponents/ClearCart';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('ClearCart', () => {
  const renderComponent = (props: any = {}) =>
    render(
      <Provider store={store}>
        <Router>
          <ClearCart {...props} />
        </Router>
      </Provider>,
    );

  it('renders the clear cart button with the correct text', () => {
    renderComponent();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });

  it('renders the clear cart button with icon only', () => {
    renderComponent({ iconOnly: true });
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.queryByText('Clear All')).not.toBeInTheDocument();
  });

  it('renders the clear cart button with custom classes', () => {
    renderComponent({ customClasses: 'custom-class' });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('opens the confirmation modal when the clear cart button is clicked', () => {
    renderComponent();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Confirm Cart Clearing')).toBeInTheDocument();
  });

  it('closes the confirmation modal when the overlay is clicked', () => {
    renderComponent();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const overlay = screen.getByText('Confirm Cart Clearing').parentElement
      ?.parentElement;
    if (overlay) {
      fireEvent.click(overlay);
    }
    expect(screen.queryByText('Confirm Cart Clearing')).not.toBeInTheDocument();
  });

  it('closes the confirmation modal when the cancel button is clicked', () => {
    renderComponent();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(screen.queryByText('Confirm Cart Clearing')).not.toBeInTheDocument();
  });
});