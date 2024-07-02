import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../src/utils/test-utils';
import { TableBody } from '../../src/components/admincomponents/TableComponents/TableBody';
import { IUser } from '../../src/types';

// Mock Data
const mockUsers: IUser[] = [
  {
    user_id: '1',
    firstname: 'John',
    email: 'john@example.com',
    active: true,
    createdAt: new Date().toISOString(),
    role: 'Admin',
    image_url: '',
  },
  {
    user_id: '2',
    firstname: 'Jane',
    email: 'jane@example.com',
    active: false,
    createdAt: new Date().toISOString(),
    role: 'User',
    image_url: '',
  },
];

// Mock functions
const mockFormatDate = (date: string) => new Date(date).toLocaleDateString();
const mockRefreshUsers = vi.fn();

describe('TableBody Component', () => {
  it('should render user rows correctly', () => {
    render(
      <table>
        <TableBody
          users={mockUsers}
          formatDate={mockFormatDate}
          refreshUsers={mockRefreshUsers}
        />
      </table>,
    );

    // Check if all user names are rendered
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.firstname)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByText(user.role)).toBeInTheDocument();
    });
  });
});
