import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Cart from '../../src/components/rootcomponents/OrderSummary';
import { store } from '../../src/redux/store';

describe('Cart Component', () => {
  it('renders Cart component correctly', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Cart />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/\$/i)).toBeInTheDocument();
  });
});
