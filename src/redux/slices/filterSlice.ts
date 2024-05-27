import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SortBy = "rating" | "price" | "name" | "-rating" | "-price" | "-name";

interface SortIndex {
  name: string;
  sortBy: SortBy;
}

interface FilterSliceState {
  categoryIndex: number;
  sortIndex: SortIndex;
  currentPage: number;
  searchValue: string;
}

const initialSortIndex: SortIndex = {
  name: "popularity ⬇️",
  sortBy: "rating",
};

const initialState: FilterSliceState = {
  categoryIndex: 0,
  sortIndex: initialSortIndex,
  currentPage: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryIndex: (state, action: PayloadAction<number>) => {
      state.categoryIndex = action.payload;
    },
    setSortIndex: (state, action: PayloadAction<SortIndex>) => {
      state.sortIndex = {
        name: action.payload.name,
        sortBy: action.payload.sortBy,
      };
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<FilterSliceState>>) => {
      state.categoryIndex = Number(action.payload.categoryIndex);
      state.sortIndex = action.payload.sortIndex || initialSortIndex;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const {
  setCategoryIndex,
  setSortIndex,
  setCurrentPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
