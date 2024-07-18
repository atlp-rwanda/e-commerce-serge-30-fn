import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecommendedProducts } from '../../../src/components/rootcomponents/RecommendedProducts';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../src/redux/store';

describe('ProductDetails Component', () => {
  it('should render the product details page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RecommendedProducts />
        </MemoryRouter>
      </Provider>,
    );
    expect(
      screen.getByText(/Loading Recommended Prodcuts.../i),
    ).toBeInTheDocument();
  });
});
