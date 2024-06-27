import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SignupState {
  email?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  borderColor?: string;
  isLoading?: boolean;
  errorMessage?: string;
  isOpen?: boolean;
  isNavigating?: boolean;
  errors: {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
  };
}

const initialState: SignupState = {
  email: '',
  username: '',
  firstname: '',
  lastname: '',
  password: '',
  borderColor: '#E0E0E0',
  isLoading: false,
  errorMessage: '',
  isOpen: false,
  isNavigating: false,
  errors: {
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    password: '',
  },
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setField(
      state,
      action: PayloadAction<{
        field: keyof Omit<SignupState, 'errors'>;
        value: string | boolean;
      }>,
    ) {
      const { field, value } = action.payload;
      (state[field] as string | boolean) = value;
    },
    setError(
      state,
      action: PayloadAction<{
        field: keyof SignupState['errors'];
        error: string;
      }>,
    ) {
      const { field, error } = action.payload;
      state.errors[field] = error;
    },
  },
});

export const { setField, setError } = signupSlice.actions;

export const signupReducer = signupSlice.reducer;
