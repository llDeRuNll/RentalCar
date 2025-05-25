import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchCars, fetchOneCar } from "./operations";

const initialState = {
  carItems: [],
  isError: false,
  isLoading: false,
  selectedCar: null,
  brands: [],
};

const slice = createSlice({
  name: "cars",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { cars, page } = action.payload;

        if (page === 1) {
          state.carItems = cars;
        } else {
          state.carItems = [...state.carItems, ...cars];
        }

        state.isLoading = false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Fetch error:", action.payload);
      })
      .addCase(fetchOneCar.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.selectedCar = null;
      })
      .addCase(fetchOneCar.fulfilled, (state, action) => {
        state.selectedCar = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOneCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Fetch single car error:", action.payload);
      })
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Fetch brands error", action.payload);
      });
  },
});
export const carReducer = slice.reducer;
