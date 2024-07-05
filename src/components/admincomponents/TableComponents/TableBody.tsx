import React from 'react';
import { IUser } from '../../../types';
import { UserRow } from './UserRow';

export interface TableBodyProps {
  users: IUser[];
  formatDate: (_date: string) => string;
  refreshUsers: () => void;
}

export const TableBody: React.FC<TableBodyProps> = ({
  users,
  formatDate,
  refreshUsers,
}) => (
  <tbody>
    {users.map((user) => (
      <UserRow
        key={user.user_id}
        user={user}
        formatDate={formatDate}
        refreshUsers={refreshUsers}
      />
    ))}
  </tbody>
);
