import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { sidebarLinks } from '../../src/data/index';
import * as rootcomponents from '../../src/components/index';

describe('Sidebar Component', () => {
  test('renders sidebar component correctly', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <rootcomponents.Sidebar userLinks={sidebarLinks} />
          </Router>
        </Provider>
      </div>,
    );
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });
});
