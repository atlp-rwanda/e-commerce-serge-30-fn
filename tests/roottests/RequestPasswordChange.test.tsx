import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import { RequestPwdChangeForm } from '../../src/components/rootcomponents/RequestPwdChangeForm';
import { RequestPwdChange } from '../../src/pages/authpages/RequestPwdChangePage';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';

describe('Request password change', () => {
  it('should render  main components', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RequestPwdChangeForm />
        </MemoryRouter>
      </Provider>,
    );

    const sendLinkButton = screen.getByRole('button', { name: 'Send Link' });
    const cancelButton = screen.getByRole('link', { name: 'Cancel' });
    expect(sendLinkButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
  it('should render the page with its two parts', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RequestPwdChange />
        </MemoryRouter>
      </Provider>,
    );
    const leftPart = screen.getByRole('image');
    const requestFormContainer = screen.getByRole('form');

    expect(requestFormContainer).toBeInTheDocument();
    expect(leftPart).toBeInTheDocument();
  });
});
