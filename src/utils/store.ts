import { configureStore } from '@reduxjs/toolkit';
import { signupReducer } from '../slices';
import verificationReducer from '../slices/verification.slice';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    verification: verificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
