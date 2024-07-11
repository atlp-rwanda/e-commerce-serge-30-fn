import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './features/auth/authSlice';
import { ecommerceSergeApi } from '../service/';
import cartReducer from './features/cartSlice';
import { searchReducer, signupReducer } from '../slices';
import verificationReducer from '../slices/verification.slice';
import UpdatePasswordReducer from '../slices/updatepassword.slice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
    verification: verificationReducer,
    cart: cartReducer,
    [ecommerceSergeApi.reducerPath]: ecommerceSergeApi.reducer,
    password: UpdatePasswordReducer,
    search:searchReducer
  },
  middleware: (getDefaultMiddle) =>
    getDefaultMiddle().concat(ecommerceSergeApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
