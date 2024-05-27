import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const pizzaApi = createApi({
    reducerPath: "pizzaApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://6646d17c51e227f23aafed62.mockapi.io/",
    }),
    endpoints: (builder) => ({
        getPizzas: builder.query({
            query: ({ category, sortBy, order, search, currentPage }) =>
                `pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        }),
    }),
})

export const { useGetPizzasQuery } = pizzaApi
