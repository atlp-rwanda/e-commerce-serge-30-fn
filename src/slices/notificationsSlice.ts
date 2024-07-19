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
      state.notifications = state.notifications.map((notification) =>
        notification.id === action.payload
          ? { ...notification, isRead: true }
          : notification,
      );
    },
  },
});

export const { setNotifications, markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
