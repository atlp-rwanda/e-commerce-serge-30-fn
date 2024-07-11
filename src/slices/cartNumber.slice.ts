import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalNumber: 0,
};

const totalNumberSlice = createSlice({
  name: 'totalNumber',
  initialState,
  reducers: {
    setTotalNumber: (state, action) => {
      state.totalNumber = action.payload;
    },
    incrementTotalNumber: (state, action) => {
      state.totalNumber += action.payload || 1;
    },
    decrementTotalNumber: (state, action) => {
      state.totalNumber -= action.payload || 1;
    },
    resetTotalNumber: (state) => {
      state.totalNumber = initialState.totalNumber;
    },
  },
});

export const {
  setTotalNumber,
  incrementTotalNumber,
  decrementTotalNumber,
  resetTotalNumber,
} = totalNumberSlice.actions;

export default totalNumberSlice.reducer;
