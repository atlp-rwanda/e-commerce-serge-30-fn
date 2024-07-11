import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WishlistButton } from '../../src/components/rootcomponents/WishlistButton';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';

describe('WishlistButton', () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <WishlistButton />
      </Provider>,
    );

  it('renders the wishlist button with the correct icon and count', async () => {
    renderComponent();
    const button = screen.getByRole('button', { name: /wishlist button/i });
    expect(button).toBeInTheDocument();
    await waitFor(() => {
      const countElement = button.querySelector('div');
      expect(countElement).toBeInTheDocument();
    });
  });

  it('opens the wishlist modal when the button is clicked', async () => {
    renderComponent();
    const button = screen.getByRole('button', { name: /wishlist button/i });
    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('closes the wishlist modal when the close button is clicked', async () => {
    renderComponent();
    const button = screen.getByRole('button', { name: /wishlist button/i });
    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    const closeButton = screen.getByRole('button', { name: /close/i });
    userEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });
});
