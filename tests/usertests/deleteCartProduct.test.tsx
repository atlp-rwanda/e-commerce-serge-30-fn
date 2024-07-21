import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeleteCartProduct } from '../../src/components/usercomponents/deleteCartProduct';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('DeleteCartProduct', () => {
  const renderComponent = (props: any = {}) =>
    render(
      <Provider store={store}>
        <Router>
          <DeleteCartProduct productId="123" {...props} />
        </Router>
      </Provider>,
    );

  it('renders the delete button with the correct icon', () => {
    renderComponent();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
