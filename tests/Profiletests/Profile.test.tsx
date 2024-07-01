import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditProfile } from '../../src/components/authcomponents/editProfile';
import * as authApi from '../../src/service/authApi';
import '@testing-library/jest-dom';
import React from 'react';

vi.mock('../../src/service/authApi', () => ({
  useUserProfileQuery: vi.fn(),
  useUpdateProfileMutation: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('EditProfile', () => {
  const mockProfile = {
    username: 'testuser',
    email: 'test@example.com',
    gender: 'male',
    birthdate: '1990-01-01',
    preferred_language: 'en',
    preferred_currency: 'USD',
    location: 'Test City',
  };

  beforeEach(() => {
    (authApi.useUserProfileQuery as jest.Mock).mockReturnValue({
      data: { profile: mockProfile },
      error: null,
      isLoading: false,
      refetch: vi.fn(),
    });

    (authApi.useUpdateProfileMutation as jest.Mock).mockReturnValue([
      vi.fn().mockResolvedValue({}),
      { isLoading: false },
    ]);
  });

  it('renders the profile view mode initially', () => {
    render(<EditProfile />);
    expect(screen.getByText('Welcome testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('switches to edit mode when "Edit Profile" button is clicked', () => {
    render(<EditProfile />);
    fireEvent.click(screen.getByText('Edit Profile'));
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender:')).toBeInTheDocument();
  });

  it('updates form inputs in edit mode', () => {
    render(<EditProfile />);
    fireEvent.click(screen.getByText('Edit Profile'));

    const genderSelect = screen.getByRole('combobox', { name: /gender/i });
    fireEvent.change(genderSelect, { target: { value: 'female' } });
    expect(genderSelect).toHaveValue('female');

    const locationInput = screen.getByRole('textbox', { name: /location/i });
    fireEvent.change(locationInput, { target: { value: 'New City' } });
    expect(locationInput).toHaveValue('New City');
  });

  it('displays loading state when fetching profile', () => {
    (authApi.useUserProfileQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      refetch: vi.fn(),
    });

    render(<EditProfile />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when profile fetch fails', () => {
    (authApi.useUserProfileQuery as jest.Mock).mockReturnValue({
      data: null,
      error: new Error('Failed to fetch'),
      isLoading: false,
      refetch: vi.fn(),
    });

    render(<EditProfile />);
    expect(screen.getByText('Error loading profile')).toBeInTheDocument();
  });
});
