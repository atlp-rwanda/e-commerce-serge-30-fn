import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../src/utils/test-utils';
import Users from '../../src/pages/adminpages/Users';
import '@testing-library/jest-dom';

describe('UserRow Component', () => {
  it('should render user data correctly', () => {
    render(<Users />);
    expect(screen.getByText(/users/i)).toBeInTheDocument();
  });
});
