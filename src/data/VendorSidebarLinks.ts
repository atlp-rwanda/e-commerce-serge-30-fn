// src/components/Sidebar/VendorSidebarLinks.tsx

import React from 'react';
import {
  MdOutlineDashboardCustomize,
  MdOutlineCategory,
  MdOutlineNotificationsActive,
} from 'react-icons/md';
import { IoBagHandleOutline } from 'react-icons/io5';

export type SidebarLink = {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
};

export const VendorSidebarLinks: SidebarLink[] = [
  {
    id: 1,
    name: 'Dashboard',
    icon: MdOutlineDashboardCustomize,
    link: '/',
  },
  {
    id: 2,
    name: 'Products',
    icon: IoBagHandleOutline,
    link: '/products',
  },
  {
    id: 3,
    name: 'Notifications',
    icon: MdOutlineNotificationsActive,
    link: '/notifications',
  },
  {
    id: 4,
    name: 'Categories',
    icon: MdOutlineCategory,
    link: '/categories',
  },
];

export type TableHeaderItem = {
  id: string;
  label: string;
};

export const tableHeaderItems: TableHeaderItem[] = [
  { id: 'image', label: 'Image' },
  { id: 'name', label: 'Name' },
  { id: 'price', label: 'Price(Rwf)' },
  { id: 'discount', label: 'Discount(%)' },
  { id: 'stock', label: 'Stock' },
  { id: 'categories', label: 'Categories' },
  { id: 'expireDate', label: 'Expire Date' },
  { id: 'action', label: 'Action' },
];
