import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from '../src/App';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
describe('App', () => {
  it('should render app component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });
});
