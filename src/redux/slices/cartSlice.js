import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const isInCart = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (isInCart) {
        isInCart.count += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice += action.payload.price;
    },
    removeProduct: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
    },
    removeSameProduct: (state, action) => {
      const isInCart = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (isInCart) {
        isInCart.count -= 1;
      }
      state.totalPrice -= action.payload.price;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, removeSameProduct, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
