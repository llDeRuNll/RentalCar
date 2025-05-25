import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById, fetchBrands } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    list: [],
    totalCars: 0,
    page: 1,
    totalPages: 1,
    selectedCar: null,
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload.cars;
        state.totalCars = payload.totalCars;
        state.page = payload.page;
        state.totalPages = payload.totalPages;
      })
      .addCase(fetchCars.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload || error.message;
      })

      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.selectedCar = payload;
      })
      .addCase(fetchCarById.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload || error.message;
      })

      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.brands = payload;
      })
      .addCase(fetchBrands.rejected, (state, { payload, error }) => {
        state.loading = false;
        state.error = payload || error.message;
      });
  },
});

export default carsSlice.reducer;
