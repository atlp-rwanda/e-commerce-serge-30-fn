import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ForgotPassword } from '../../src/pages/authpages/ForgotPassword';
import React from 'react';

describe('ForgotPassword', () => {
  it('should render ForgotPassword component', () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
  });
});
