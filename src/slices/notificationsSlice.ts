// src/store/notificationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '../types';

interface NotificationsState {
  notifications: INotification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<INotification[]>) {
      state.notifications = action.payload;
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        (n) => n.id === action.payload,
      );
      if (notification) {
        notification.isRead = true;
      }
    },
    markAllAsRead(state) {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));
    },
  },
});

export const { setNotifications, markAsRead, markAllAsRead } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
