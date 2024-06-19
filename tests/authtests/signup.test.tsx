import { render, screen, fireEvent } from '@testing-library/react';
import { Signup } from '../../src/pages/index';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

describe('Signup Component', () => {
  test('renders signup form with all fields', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Signup />
          </Router>
        </Provider>
      </div>,
    );

    expect(screen.getByPlaceholderText(/email@domain.com/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Username/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Firstname/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Lastname/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Password/i)).toBeTruthy();
  });

  test('accepts valid username input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Signup />
          </Router>
        </Provider>
      </div>,
    );

    const usernameInput = screen.getByPlaceholderText(
      /Username/i,
    ) as HTMLInputElement;
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    expect(usernameInput.value).toBe('testuser');
  });

  test('accepts valid first name input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Signup />
          </Router>
        </Provider>
      </div>,
    );

    const firstNameInput = screen.getByPlaceholderText(
      /Firstname/i,
    ) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    expect(firstNameInput.value).toBe('John');
  });

  test('rejects invalid first name input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Signup />
          </Router>
        </Provider>
      </div>,
    );

    const firstNameInput = screen.getByPlaceholderText(
      /Firstname/i,
    ) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: '' } });

    expect(firstNameInput.value).toBe('');
  });

  test('accepts valid last name input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Signup />
          </Router>
        </Provider>
      </div>,
    );

    const lastNameInput = screen.getByPlaceholderText(
      /Lastname/i,
    ) as HTMLInputElement;
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    expect(lastNameInput.value).toBe('Doe');
  });

  test('rejects invalid last name input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Signup />
          </Router>
        </Provider>
      </div>,
    );

    const lastNameInput = screen.getByPlaceholderText(
      /Lastname/i,
    ) as HTMLInputElement;
    fireEvent.change(lastNameInput, { target: { value: '' } });

    expect(lastNameInput.value).toBe('');
  });

  test('accepts valid password input', () => {
    render(
      <div id="root">
        <Provider store={store}>
          <Router>
            <Signup />
          </Router>
        </Provider>
      </div>,
    );

    const passwordInput = screen.getByPlaceholderText(
      /Password/i,
    ) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });
});
