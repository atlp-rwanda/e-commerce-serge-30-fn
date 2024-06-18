import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserLayout } from '../../src/layouts/UserLayout';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('UserLayout Component', () => {
  test('renders UserLayout component correctly', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <UserLayout />
          </Router>
        </Provider>
      </div>,
    );

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
