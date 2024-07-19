import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NotificationPanel from '../../src/components/usercomponents/NotificationPanel';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { setNotifications } from '../../src/slices/notificationsSlice';
import socket from '../../src/utils/socket';

vi.mock('../../src/hooks/useToken', () => ({
  useToken: () => ({ token: 'mock-token', user: {} }),
}));

const mockNotifications = [
  {
    id: '1',
    message: 'First notification',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    message: 'Second notification',
    isRead: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    message: 'Third notification',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
];

describe('NotificationPanel', () => {
  beforeEach(() => {
    vi.spyOn(socket, 'emit').mockImplementation((event, userId) => {
      if (event === 'fetchNotifications') {
        socket.emit('notifications', mockNotifications);
      }
    });

    vi.spyOn(socket, 'on').mockImplementation((event, callback) => {
      if (event === 'notifications') {
        callback(mockNotifications);
      }
    });

    store.dispatch(setNotifications(mockNotifications));
  });

  it('shows the number of unread notifications', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NotificationPanel />
        </BrowserRouter>
      </Provider>,
    );

    const unreadBadge = screen.getByText('2');
    expect(unreadBadge).toBeInTheDocument();
  });

  it('opens the panel and displays notifications on button click', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NotificationPanel />
        </BrowserRouter>
      </Provider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('First notification')).toBeInTheDocument();
    expect(screen.getByText('Second notification')).toBeInTheDocument();
    expect(screen.getByText('Third notification')).toBeInTheDocument();
  });
});
