import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { IoBagHandleOutline } from 'react-icons/io5';
import { MdStarOutline, MdOutlineNotificationsActive } from 'react-icons/md';
import React from 'react';

type SidebarLink = {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
};

export const sidebarLinks: SidebarLink[] = [
  {
    id: 1,
    name: 'Dashboard',
    icon: MdOutlineDashboardCustomize,
    link: '/',
  },
  {
    id: 2,
    name: 'My orders',
    icon: IoBagHandleOutline,
    link: '/orders',
  },
  {
    id: 3,
    name: 'Reviews',
    icon: MdStarOutline,
    link: '/reviews',
  },
  {
    id: 4,
    name: 'Notifications',
    icon: MdOutlineNotificationsActive,
    link: '/notifications',
  },
  {
    id: 5,
    name: 'Wishlist',
    icon: FaRegHeart,
    link: '/wishlist',
  },
];
