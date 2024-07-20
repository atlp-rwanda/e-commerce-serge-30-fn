import React from 'react';
import { IUser } from '../../../types';
import Status from './Status';
import ActionButton from './ActionButton';

interface UserRowProps {
  user: IUser;
  formatDate: (_date: string) => string;
  refreshUsers: () => void;
}

export const UserRow: React.FC<UserRowProps> = ({
  user,
  formatDate,
  refreshUsers,
}) => (
  <tr key={user.user_id} className="border-b">
    <td className="py-1 px-4 flex items-center max-tablet:hidden">
      <img
        src={user.image_url ? user.image_url : 'https://i.pravatar.cc/300'}
        alt="user Image"
        className="w-12 h-12 mr-4 rounded-full"
      />
    </td>
    <td className="py-1 px-4">{user.firstname}</td>
    <td className="py-1 px-4 max-tablet:hidden">{user.email}</td>
    <td className="py-1 px-4 max-tablet:hidden">
      {' '}
      <Status isActive={user.active} />
    </td>
    <td className="px-4 py-1 max-tablet:hidden">
      {user ? formatDate(user.createdAt.toString()) : ''}
    </td>
    <td className="py-1 px-4">{user.role}</td>

    <td className="py-1 px-4">
      <ActionButton
        activeRole={user.role}
        refreshUsers={refreshUsers}
        id={user.user_id}
      />
    </td>
  </tr>
);
