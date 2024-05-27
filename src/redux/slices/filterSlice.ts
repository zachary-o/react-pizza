import { createSlice } from "@reduxjs/toolkit";

interface SortIndex {
  name: string;
  sortBy: string;
}

interface FilterSliceState {
  categoryIndex: number;
  sortIndex: SortIndex;
  currentPage: number;
  searchValue: string;
}

const initialState: FilterSliceState = {
  categoryIndex: 0,
  sortIndex: {
    name: "popularity ⬇️",
    sortBy: "rating",
  },
  currentPage: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryIndex: (state, action) => {
      state.categoryIndex = action.payload;
    },
    setSortIndex: (state, action) => {
      state.sortIndex = {
        name: action.payload.name,
        sortBy: action.payload.sortBy,
      };
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setFilters: (state, action) => {
      state.categoryIndex = Number(action.payload.categoryIndex);
      state.sortIndex = action.payload.sortIndex;
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
