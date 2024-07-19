import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { NotificationPage } from '../../src/pages/userPages/NotificationPage';
import socket from '../../src/utils/socket';
import { setNotifications } from '../../src/slices/notificationsSlice';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

const mockNotifications = [
  {
    id: '1',
    message: 'Test notification',
    isRead: false,
    createdAt: '2024-07-20T10:00:00Z',
  },
];

describe('NotificationPage', () => {
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

  it('renders notification page title', () => {
    render(
      <Provider store={store}>
        <NotificationPage />
      </Provider>,
    );
    expect(screen.getByText('All Notifications')).toBeInTheDocument();
  });

  it('displays a notification', () => {
    render(
      <Provider store={store}>
        <NotificationPage />
      </Provider>,
    );
    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });
});
