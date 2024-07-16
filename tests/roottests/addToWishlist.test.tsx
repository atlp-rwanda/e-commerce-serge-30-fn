import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../src/redux/store';
import { AddToWishlist } from '../../src/components/rootcomponents/AddToWishlist';

describe('AddToWishlist', () => {
  const renderComponent = (props: any) =>
    render(
      <Provider store={store}>
        <Router>
          <AddToWishlist {...props} />
        </Router>
      </Provider>
    );

  it('renders the wishlist button with the correct icon', () => {
    renderComponent({ productId: '1', isInWishlist: false });
    const button = screen.getByRole('button', { name: /add to wishlist/i });
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('does not add product to wishlist if it is already in the wishlist', () => {
    renderComponent({ productId: '1', isInWishlist: true });
    const button = screen.getByRole('button', { name: /add to wishlist/i });
    fireEvent.click(button);
    expect(screen.queryByText('Product added to wishlist successfully.')).not.toBeInTheDocument();
  });
});
