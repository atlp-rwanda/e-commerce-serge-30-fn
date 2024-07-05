import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../src/utils/test-utils';
import { UserRow } from '../../src/components/admincomponents/TableComponents/UserRow';

import '@testing-library/jest-dom';
import { IUser } from '../../src/types';

const mockUser: IUser = {
  user_id: '1',
  firstname: 'John',
  email: 'john@example.com',
  active: true,
  createdAt: new Date().toISOString(),
  role: 'Admin',
  image_url: '',
};

const mockFormatDate = (date: string) => 'formatted date';
const mockRefreshUsers = vi.fn();

describe('UserRow Component', () => {
  it('should render user data correctly', () => {
    render(
      <table>
        <tbody>
          <UserRow
            user={mockUser}
            formatDate={mockFormatDate}
            refreshUsers={mockRefreshUsers}
          />
        </tbody>
      </table>,
    );

    expect(screen.getByText(mockUser.firstname)).toBeInTheDocument();

    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    expect(screen.getByText('formatted date')).toBeInTheDocument();

    expect(screen.getByText(mockUser.role)).toBeInTheDocument();
  });
});
