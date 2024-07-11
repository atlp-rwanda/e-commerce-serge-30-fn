import React from 'react';
import { ProductRow } from '../../src/components/rootcomponents/ProductRow';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ProductRow Component', () => {
  const data = {
    productId: 1,
    name: 'puma',
    price: 20,
    quantity: 10,
    images: ['hello'],
  };
  it('renders ProductRow component correctly', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductRow product={data} />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/puma/i)).toBeInTheDocument();
    });
  });
});
