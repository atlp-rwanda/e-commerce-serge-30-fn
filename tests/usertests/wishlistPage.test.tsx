import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import WishlistPage from '../../src/pages/userPages/WishlistPage';
import { store } from '../../src/redux/store';
describe('Wishlist ', () => {
  it('should load a loading screen when loading', () => {
    render(
      <Provider store={store}>
        <Router>
          <WishlistPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/My/i)).toBeInTheDocument();
  });
  it('should not load a loading screen when not loading instead data', () => {
    render(
      <Provider store={store}>
        <Router>
          <WishlistPage />
        </Router>
      </Provider>,
    );
    expect(screen.queryByTestId('table-skeleton')).toBeNull();
  });
  it('All products should be in the document', () => {
    render(
      <Provider store={store}>
        <Router>
          <WishlistPage />
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('myorders')).toBeInTheDocument();
  });
});
