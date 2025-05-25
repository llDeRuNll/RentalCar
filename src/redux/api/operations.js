import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const axiosFetcher = axios.create({
  baseURL: "https://car-rental-api.goit.global/",
});

export const fetchCars = createAsyncThunk(
  "fetchCars",
  async (
    { page = 1, limit = 8, brand, rentalPrice, minMileage, maxMileage },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
      });

      if (brand) params.append("brand", brand);
      if (rentalPrice) params.append("rentalPrice", rentalPrice);
      if (minMileage) params.append("minMileage", minMileage);
      if (maxMileage) params.append("maxMileage", maxMileage);

      const response = await axiosFetcher(`cars?${params.toString()}`);
      return {
        cars: response.data.cars,
        totalPages: response.data.totalPages,
        page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOneCar = createAsyncThunk(
  "fetchOneCar",
  async (carId, thunkAPI) => {
    try {
      const response = await axiosFetcher(`cars/${carId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchBrands = createAsyncThunk(
  "fetchBrands",
  async (_, thunkAPI) => {
    try {
      const response = await axiosFetcher(`brands`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
