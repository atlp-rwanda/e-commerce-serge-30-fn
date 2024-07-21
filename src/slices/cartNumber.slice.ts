import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  totalNumber: 0,
  cartId: '',
};

const totalNumberSlice = createSlice({
  name: 'totalNumber',
  initialState,
  reducers: {
    setTotalNumber: (state, action: PayloadAction<number>) => {
      state.totalNumber = action.payload;
    },
    setCartId: (state, action: PayloadAction<string>) => {
      state.cartId = action.payload;
    },
    resetTotalNumber: (state) => {
      state.totalNumber = initialState.totalNumber;
    },
  },
});

export const { setTotalNumber, setCartId, resetTotalNumber } =
  totalNumberSlice.actions;

export default totalNumberSlice.reducer;
