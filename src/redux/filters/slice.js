import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carBrand: "",
  priceHour: "",
  carMilleage: {
    from: "",
    to: "",
  },
  isFilterActive: false,
};
const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCarBrand: (state, action) => {
      state.carBrand = action.payload;
    },
    setPriceHour: (state, action) => {
      state.priceHour = action.payload;
    },
    setCarMilleageFrom: (state, action) => {
      state.carMilleage.from = action.payload;
    },
    setCarMilleageTo: (state, action) => {
      state.carMilleage.to = action.payload;
    },
    setFilterActive: (state) => {
      state.isFilterActive = true;
    },
    resetFilters: () => initialState,
  },
});
export const {
  setCarBrand,
  setPriceHour,
  setCarMilleageFrom,
  setCarMilleageTo,
  setFilterActive,
  resetFilters,
} = slice.actions;
export const filterReducer = slice.reducer;
