import { createSlice } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  count: number;
  imageUrl: string;
  name: string;
  type: string;
  sizes: number[];
  price: number;
};

interface CartSliceState {
  cartItems: CartItem[];
  totalPrice: number;
}

const initialState: CartSliceState = {
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
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.totalPrice -= action.payload.price * action.payload.count;
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
