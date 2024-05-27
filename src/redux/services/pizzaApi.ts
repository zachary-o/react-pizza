import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Pizza {
  id: number;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
}

export interface GetPizzasParams {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: number;
}

export const pizzaApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6646d17c51e227f23aafed62.mockapi.io/",
  }),
  endpoints: (builder) => ({
    getPizzas: builder.query<Pizza[], GetPizzasParams>({
      query: ({ category, sortBy, order, search, currentPage }) =>
        `pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    }),
    getPizzaById: builder.query<Pizza[], string>({
      query: (id) => `pizza?id=${id}`,
    }),
  }),
});

export const { useGetPizzasQuery, useGetPizzaByIdQuery } = pizzaApi;
