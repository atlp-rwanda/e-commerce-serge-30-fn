import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import AllOrders from '../../src/components/usercomponents/Orders';
import { OrderPage, SingleOrder } from '../../src/pages/userPages';

describe('All Orders ', () => {
  it('should load a loading screen when loading', () => {
    const orders = [];
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AllOrders orders={orders} isLoading={true} />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId('table-skeleton')).toBeInTheDocument();
  });
  it('should not load a loading screen when not loading instead data', () => {
    const orders = [];
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AllOrders orders={orders} isLoading={false} />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.queryByTestId('table-skeleton')).toBeNull();
  });
  it('All Orders should be in the document', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId('myorders')).toBeInTheDocument();
  });
  
});
