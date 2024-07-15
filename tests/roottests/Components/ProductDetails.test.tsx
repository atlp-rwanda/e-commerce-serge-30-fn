import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductDetails } from '../../../src/components/rootcomponents/ProductDetails';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../src/redux/store';

describe('ProductDetails Component', () => {
  it('should render the product details page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductDetails />
        </MemoryRouter>
      </Provider>,
    );
    expect(
      screen.getByText(/An error Occured, Try again/i),
    ).toBeInTheDocument();
  });
});
