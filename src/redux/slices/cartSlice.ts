import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  count: number;
  imageUrl: string;
  name: string;
  type: string;
  size: number;
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

interface RemoveSameProductPayload {
  id: number;
  price: number;
}
interface RemoveProductPayload {
  id: number;
  price: number;
  count: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItem>) => {
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
    removeProduct: (state, action: PayloadAction<RemoveProductPayload>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.totalPrice -= action.payload.price * action.payload.count;
    },
    removeSameProduct: (
      state,
      action: PayloadAction<RemoveSameProductPayload>
    ) => {
      const isInCart = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (isInCart && isInCart.count > 0) {
        isInCart.count -= 1;
      }
      if (state.totalPrice > 0) {
        state.totalPrice -= action.payload.price;
      }
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
