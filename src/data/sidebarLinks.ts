import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { IoBagHandleOutline } from 'react-icons/io5';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { MdOutlinePayment } from 'react-icons/md';
import React from 'react';

export type UserSidebarLink = {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
};

export const sidebarLinks: UserSidebarLink[] = [
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
    link: '/orders/all',
  },
  {
    id: 3,
    name: 'Payments',
    icon: MdOutlinePayment,
    link: '/payment/all',
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
  {
    id: 6,
    name: 'Chat',
    icon: IoChatbubblesOutline,
    link: '/chat',
  },
];
