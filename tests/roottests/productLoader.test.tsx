import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import ProductLoader from '../../src/components/rootcomponents/ProductLoader';

describe('ProductLoader', () => {
  it('should render productLoader', () => {
    render(
      <Provider store={store}>
        <ProductLoader count={1} />
      </Provider>,
    );

    const heading = screen.getAllByRole('heading');

    expect(heading.length).toBeGreaterThan(0);
  });
});
