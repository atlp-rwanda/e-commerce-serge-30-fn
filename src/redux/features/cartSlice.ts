import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string[];
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.product_id === action.payload.product_id,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
