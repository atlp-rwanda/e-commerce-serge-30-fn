import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ResetPassword } from '../../src/pages/authpages/ResetPassword';

describe('ResetPassword', () => {
  it('renders ResetPassword component with form and image', () => {
    render(
      <MemoryRouter initialEntries={['/auth/reset-password/test-token']}>
        <Routes>
          <Route
            path="/auth/reset-password/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const headings = screen.getAllByText(/Reset Password/i);
    expect(headings.length).toBeGreaterThan(0);

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });
});
