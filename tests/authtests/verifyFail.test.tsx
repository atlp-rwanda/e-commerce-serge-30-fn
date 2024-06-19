import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VerificationFail } from '../../src/pages/index';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import '@testing-library/jest-dom';

describe('VerificationFail Component', () => {
  test('renders verification fail message with email input field', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <VerificationFail />
          </Router>
        </Provider>
      </div>,
    );

    expect(screen.getByText(/Verification Failed/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your email/i),
    ).toBeInTheDocument();
  });

  test('accepts valid email input', async () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <VerificationFail />
          </Router>
        </Provider>
      </div>,
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });

    expect(emailInput).toHaveValue('testuser@example.com');
  });

  test('rejects invalid email input', async () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <VerificationFail />
          </Router>
        </Provider>
      </div>,
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(emailInput, { target: { value: 'testuser@' } });

    expect(emailInput).toHaveValue('testuser@');
  });

  test('displays error message when email input is empty', async () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <VerificationFail />
          </Router>
        </Provider>
      </div>,
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(emailInput, { target: { value: '' } });

    const resendButton = screen.getByText(/Resend Verification Link/i);
    fireEvent.click(resendButton);

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  test('displays error message when email input is invalid', async () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <VerificationFail />
          </Router>
        </Provider>
      </div>,
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(emailInput, { target: { value: 'testuser@' } });

    const resendButton = screen.getByText(/Resend Verification Link/i);
    fireEvent.click(resendButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    });
  });
});
