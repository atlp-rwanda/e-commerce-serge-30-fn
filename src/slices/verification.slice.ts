import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface VerificationState {
  email: string;
  message: string;
  isLoading: boolean;
  messageColor: string;
}

const initialState: VerificationState = {
  email: '',
  message: '',
  isLoading: false,
  messageColor: 'text-red-500',
};

export const resendVerification = createAsyncThunk(
  'verification/resendVerification',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEPLOYED_URL}/api/v1/resend-verification-token`,
        { email },
      );
      return response.data.message;
    } catch (error: unknown) {
      return rejectWithValue(
        'Failed to resend verification link. Please try again.',
      );
    }
  },
);

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setMessageColor(state, action) {
      state.messageColor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resendVerification.pending, (state) => {
        state.isLoading = true;
        state.message = '';
      })
      .addCase(resendVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload as string;
        state.messageColor = 'text-green-500';
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload as string;
        state.messageColor = 'text-red-500';
      });
  },
});

export const { setEmail, setMessage, setMessageColor } =
  verificationSlice.actions;

export default verificationSlice.reducer;
