import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../src/pages/userPages/Home';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('UserLayout Component', () => {
  test('renders UserLayout component correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/new/i)).toBeInTheDocument();
  });
});
