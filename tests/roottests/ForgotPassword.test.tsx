import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ForgotPassword } from '../../src/pages/authpages/ForgotPassword';
import { renderWithProviders } from '../../src/utils/test-utils'; // Adjust the import path as needed

describe('ForgotPassword', () => {
  it('should render ForgotPassword component', () => {
    renderWithProviders(<ForgotPassword />);

    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
  });
});
