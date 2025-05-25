import axios from "axios";

const API_URL = "https://car-rental-api.goit.global/cars";
export const getCars = async ({
  page = 1,
  limit = 8,
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
}) => {
  const params = { page, limit };
  if (brand) params.brand = brand;
  if (rentalPrice) params.rentalPrice = rentalPrice;
  if (minMileage) params.minMileage = minMileage;
  if (maxMileage) params.maxMileage = maxMileage;
  const response = await axios.get(API_URL, { params });
  return response.data;
};
export const getCarById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
