import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductReviews } from '../../../src/components/usercomponents/reviews';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../src/redux/store';

describe('ProductDetails Component', () => {
  it('should render the product details page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductReviews />
        </MemoryRouter>
      </Provider>,
    );
    expect(
      screen.getByText(/Add Review/i),
    ).toBeInTheDocument();
  });
});
