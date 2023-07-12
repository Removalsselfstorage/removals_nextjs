import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    updateCart: (state, action) => {
      state.cartItems = action.payload;
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export const getAllCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
