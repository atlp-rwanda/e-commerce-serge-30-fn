import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UpdatePasswordState {
  state: string;
  data: string;
  status: number | null;
  loading: boolean;
  error: boolean;
}

const initialState: UpdatePasswordState = {
  state: 'INITIAL',
  data: '',
  status: null,
  loading: false,
  error: false,
};

const updatePasswordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    passwordMismatch: (state) => {
      state.state = 'REJECTED';
      state.loading = false;
      state.status = 400;
      state.error = true;
      state.data = 'New passwords do not match.';
    },
    passwordTooShort: (state) => {
      state.state = 'REJECTED';
      state.loading = false;
      state.status = 400;
      state.error = true;
      state.data = 'Password must be minumum of 6 characters';
    },
    setLoading: (state) => {
      state.state = 'PENDING';
      state.loading = true;
      state.error = false;
      state.data = '';
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.state = 'FULFILLED';
      state.loading = false;
      state.status = 200;
      state.error = false;
      state.data = action.payload;
    },
    setErrorrMsg: (state, action: PayloadAction<string>) => {
      state.state = 'REJECTED';
      state.loading = false;
      state.status = 500;
      state.error = true;
      state.data = action.payload;
    },
  },
});

export const { passwordMismatch, passwordTooShort, setLoading, setSuccess, setErrorrMsg } = updatePasswordSlice.actions;
export default updatePasswordSlice.reducer;
