import React from 'react';
import {
  MdFavoriteBorder,
  MdPayment,
} from 'react-icons/md';
import { GrUserWorker } from 'react-icons/gr';
import { HiUsers } from 'react-icons/hi';
import { IoChatbubblesOutline } from 'react-icons/io5';
export type SidebarLink = {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
};

export const AdminSidebarLinks: SidebarLink[] = [
  {
    id: 2,
    name: 'Orders',
    icon: MdFavoriteBorder,
    link: '/orders',
  },
  {
    id: 3,
    name: 'Payments',
    icon: MdPayment,
    link: '/products',
  },
  {
    id: 4,
    name: 'Vendor',
    icon: GrUserWorker,
    link: '/vendors',
  },
  {
    id: 6,
    name: 'users',
    icon: HiUsers,
    link: '/users',
  },
  {
    id: 7,
    name: 'chat',
    icon: IoChatbubblesOutline,
    link: '/chat',
  },
];

export type TableHeaderItem = {
  id: string;
  label: string;
};

export const tableHeaderItems: TableHeaderItem[] = [
  { id: 'image', label: 'Image' },
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'CreatedAt' },
  { id: 'role', label: 'Role' },
  { id: 'action', label: 'Action' },
];
