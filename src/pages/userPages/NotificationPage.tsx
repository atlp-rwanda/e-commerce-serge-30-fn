// src/components/NotificationPage.tsx
import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '../../components/usercomponents/NotificaitonComponent';
import socket from '../../utils/socket';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setNotifications,
  markAsRead as markAsReadInStore,
} from '../../slices/notificationsSlice';
import { useMarkAsReadMutation } from '../../service/authApi';
import { INotification } from '../../types/Notificaiton.types';
import { useToken } from '../../hooks/useToken';
const ITEMS_PER_PAGE = 10;

export const NotificationPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<'all' | 'unread' | 'today'>('all');
  const notifications = useAppSelector(
    (state) => state.notifications.notifications,
  );
  const dispatch = useAppDispatch();
  const [markAsRead] = useMarkAsReadMutation();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {},
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useToken();
  const userId = user?.user_id;
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

  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilter: 'all' | 'unread' | 'today') => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleNotificationClick = async (notification: INotification) => {
    if (!notification.isRead && !loadingStates[notification.id]) {
      setLoadingStates((prevState) => ({
        ...prevState,
        [notification.id]: true,
      }));
      try {
        await markAsRead(notification.id).unwrap();
        dispatch(markAsReadInStore(notification.id));
      } catch (error) {
        toast.error('Error while marking notification as read');
      } finally {
        setLoadingStates((prevState) => ({
          ...prevState,
          [notification.id]: false,
        }));
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="w-10/12 mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        All Notifications
      </h1>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            } hover:bg-blue-600`}
          >
            All
          </Button>
          <Button
            onClick={() => handleFilterChange('unread')}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              filter === 'unread'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            } hover:bg-blue-600`}
          >
            Unread
          </Button>
          <Button
            onClick={() => handleFilterChange('today')}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              filter === 'today'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            } hover:bg-blue-600`}
          >
            Today
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse flex space-x-4 p-4">
              <div className="rounded-full bg-gray-300 h-12 w-12" />
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">Error loading notifications: {error}</div>
      ) : (
        <div className="divide-y divide-gray-200">
          {paginatedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`py-4 flex items-center hover:bg-gray-100 transition duration-300 cursor-pointer ${
                notification.isRead ? 'opacity-70' : 'font-semibold'
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex-shrink-0 mr-3">
                <FaBell
                  className={`h-6 w-6 ${notification.isRead ? 'text-gray-400' : 'text-red-500'}`}
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  {loadingStates[notification.id] ? (
                    <div className="animate-pulse h-4 bg-gray-300 rounded w-3/4" />
                  ) : (
                    <p className="text-sm truncate">{notification.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formatDate(notification.createdAt)}
                  </p>
                  {!notification.isRead && (
                    <span className="inline-block mt-1 px-2 py-1 bg-green-500 text-white text-xs rounded-md">
                      Unread
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-400'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-400'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
