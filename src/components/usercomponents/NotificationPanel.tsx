// src/components/NotificationPanel.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useMarkAsReadMutation } from '../../service/authApi';
import {
  Button,
  NotificationBadge,
  NotificationFilters,
  NotificationList,
} from './NotificaitonComponent';
import socket from '../../utils/socket';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setNotifications,
  markAsRead as markAsReadInStore,
} from '../../slices/notificationsSlice';
import { useToken } from '../../hooks/useToken';
const NotificationPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedNotificationId, setExpandedNotificationId] = useState<
    string | null
  >(null);
  const [loadingNotifications, setLoadingNotifications] = useState<string[]>(
    [],
  );
  const [filter, setFilter] = useState<'all' | 'unread' | 'today'>('all');
  const notifications = useAppSelector(
    (state) => state.notifications.notifications,
  );
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const notificationPanelRef = useRef<HTMLDivElement>(null);
  const { user } = useToken();
  const [markAsRead] = useMarkAsReadMutation();
  const userId = user?.user_id;
  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationPanelRef.current &&
      !notificationPanelRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    socket.emit('fetchNotifications', userId);

    socket.on('notifications', (data) => {
      dispatch(setNotifications(data));
      setIsLoading(false);
    });

    socket.on('error', (error) => {
      setError(error);
      setIsLoading(false);
    });

    return () => {
      socket.off('notifications');
      socket.off('error');
    };
  }, [dispatch]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const toggleExpand = async (id: string) => {
    const notification = notifications.find((n) => n.id === id);

    if (!notification || notification.isRead) {
      setExpandedNotificationId(expandedNotificationId === id ? null : id);
      return;
    }

    setLoadingNotifications((prev) => [...prev, id]);
    try {
      await markAsRead(id).unwrap();
      dispatch(markAsReadInStore(id));
    } catch (error) {
      toast.error('Error while marking notification as read');
    }

    setLoadingNotifications((prev) =>
      prev.filter((notificationId) => notificationId !== id),
    );
    setExpandedNotificationId(expandedNotificationId === id ? null : id);
  };

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const filteredNotifications = sortedNotifications.filter((notification) => {
    if (filter === 'unread') {
      return !notification.isRead;
    } else if (filter === 'today') {
      const today = new Date().toLocaleDateString();
      const notificationDate = new Date(
        notification.createdAt,
      ).toLocaleDateString();
      return notificationDate === today;
    }
    return true;
  });

  return (
    <div className="relative">
      <ToastContainer />
      <Button onClick={togglePanel}>
        <FaBell className="h-6 w-6" />
        {notifications.some((notification) => !notification.isRead) && (
          <NotificationBadge
            count={
              notifications.filter((notification) => !notification.isRead)
                .length
            }
          />
        )}
      </Button>
      {isOpen && (
        <>
          <div
            ref={notificationPanelRef}
            className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-20 overflow-hidden"
          >
            <div className="p-4">
              <p className="text-gray-700 font-semibold mb-3">Notifications</p>
              <NotificationFilters filter={filter} setFilter={setFilter} />
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse flex space-x-4 p-4"
                    >
                      <div className="rounded-full bg-gray-300 h-12 w-12" />
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-300 rounded w-3/4" />
                        <div className="h-4 bg-gray-300 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-red-500">
                  Error loading notifications: {error}
                </div>
              ) : (
                <NotificationList
                  notifications={filteredNotifications}
                  onNotificationClick={toggleExpand}
                  loadingNotifications={loadingNotifications}
                  expandedNotificationId={expandedNotificationId}
                />
              )}
              <div className="mt-4 text-center">
                <Link
                  to="notifications"
                  className="text-blue-500 hover:underline transition duration-300"
                  onClick={togglePanel}
                >
                  View All
                </Link>
              </div>
            </div>
          </div>
          <div
            onClick={togglePanel}
            className="fixed inset-0 bg-black opacity-50 z-10"
          ></div>
        </>
      )}
    </div>
  );
};

export default NotificationPanel;
