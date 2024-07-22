import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JwtPayload } from 'jwt-decode';
import { RootState } from '../../store';
interface User {
  active: boolean;
  createdAt: string;
  email: string;
  emailVerificationToken: string;
  emailVerificationTokenExpiration: string;
  firstname: string;
  google_id: string | null;
  google_token: string | null;
  image_url: string | null;
  lastname: string;
  resetToken: string | null;
  resetTokenExpiration: string | null;
  role: 'ADMIN' | 'USER' | 'VENDOR';
  updatedAt: string;
  user_id: string;
  username: string;
  verified: boolean;
}
export interface UserState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  twoAuth: boolean;
}

const initialState: UserState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')!) || 'null',
  isAuthenticated: !!localStorage.getItem('token'),
  twoAuth: !!localStorage.getItem('twoAuth'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
    clearUserData: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    setAuthentication(state, action) {
      state.isAuthenticated = action.payload;
    },
    setTwoAuth: (state, action: PayloadAction<boolean>) => {
      state.twoAuth = action.payload;
      localStorage.setItem('twoAuth', JSON.stringify(action.payload));
    },
  },
});
export interface CustomJwtPayload extends JwtPayload {
  user: User;
}
export const {
  setToken,
  setUser,
  clearUserData,
  setAuthentication,
  setTwoAuth,
} = userSlice.actions;
export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
