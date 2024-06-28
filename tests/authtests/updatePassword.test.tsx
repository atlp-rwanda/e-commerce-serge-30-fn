import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../src/redux/store';
import { UpdatePassword } from '../../src/components/authcomponents/updatePassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { describe, it, vi, expect, beforeEach } from 'vitest';

describe('UpdatePassword component', () => {

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UpdatePassword />
          <ToastContainer />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the form components', () => {
    const oldPasswordInput = screen.getByPlaceholderText('Old Password');
    const newPasswordInput = screen.getByPlaceholderText('New Password');
    const confirmNewPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const updateButton = screen.getByRole('button', { name: /Update Password/i });

    expect(oldPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmNewPasswordInput).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
  });

  it('should display an error if new passwords do not match', async () => {
    const newPasswordInput = screen.getByPlaceholderText('New Password');
    const confirmNewPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const updateButton = screen.getByRole('button', { name: /Update Password/i });

    fireEvent.change(newPasswordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmNewPasswordInput, { target: { value: 'password456' } });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText('New passwords do not match.')).toBeInTheDocument();
    });
  });

  it('should display an error if the new password is too short', async () => {
    const newPasswordInput = screen.getByPlaceholderText('New Password');
    const confirmNewPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const updateButton = screen.getByRole('button', { name: /Update Password/i });

    fireEvent.change(newPasswordInput, { target: { value: '123' } });
    fireEvent.change(confirmNewPasswordInput, { target: { value: '123' } });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be a minimum of 6 characters.')).toBeInTheDocument();
    });
  });

});
