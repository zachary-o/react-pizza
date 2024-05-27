import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { pizzaApi } from "./services/pizzaApi";
import cart from "./slices/cartSlice";
import filter from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
