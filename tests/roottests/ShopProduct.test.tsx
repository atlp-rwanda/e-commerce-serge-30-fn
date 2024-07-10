import React from 'react';
import ShopProduct from '../../src/components/rootcomponents/ShopProduct';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ShopProduct Component', () => {
  it('renders ShopProduct component correctly', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ShopProduct />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).toBeInTheDocument();
    });
  });
});
