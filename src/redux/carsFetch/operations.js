import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронний thunk для отримання списку машин
export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://car-rental-api.goit.global/cars",
        { params }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Асинхронний thunk для отримання деталей однієї машини
export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://car-rental-api.goit.global/cars/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Асинхронний thunk для отримання всіх брендів
export const fetchBrands = createAsyncThunk(
  "cars/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://car-rental-api.goit.global/cars/brands"
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
