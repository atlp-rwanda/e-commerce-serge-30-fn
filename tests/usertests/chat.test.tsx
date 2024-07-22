import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Chat from '../../src/pages/userPages/Chat';
import { store } from '../../src/redux/store';

describe('UserLayout Component', () => {
  test('renders UserLayout component correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <Chat />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/send/i)).toBeInTheDocument();
  });
});
