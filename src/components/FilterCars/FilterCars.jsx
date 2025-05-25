import { useState, useEffect } from "react";
import s from "./FilterCars.module.css";

const API_URL = "https://car-rental-api.goit.global/cars";

const FilterCars = ({ onSearch }) => {
  const [brands, setBrands] = useState([]);
  const [local, setLocal] = useState({
    brand: "",
    rentalPrice: "",
    carMileage: { from: "", to: "" },
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}?page=1&limit=1000`);
        const { cars } = await res.json();
        const uniq = Array.from(new Set(cars.map((c) => c.brand)));
        setBrands(uniq);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleField = (e) => {
    const { name, value } = e.target;
    if (name === "brand" || name === "rentalPrice") {
      setLocal((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMileage = (e) => {
    const { name, value } = e.target;
    setLocal((prev) => ({
      ...prev,
      carMileage: { ...prev.carMileage, [name]: value },
    }));
  };

  const handleSearch = () => {
    onSearch({
      brand: local.brand || undefined,
      rentalPrice: local.rentalPrice || undefined,
      carMileage: {
        from: local.carMileage.from || undefined,
        to: local.carMileage.to || undefined,
      },
    });
  };

  return (
    <div className={s.filterWrapper}>
      <div className={s.filterItem}>
        <label>Car brand</label>
        <select
          name="brand"
          value={local.brand}
          onChange={handleField}
          className={`${s.control} ${s.select}`}
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className={s.filterItem}>
        <label>Price/hour</label>
        <select
          name="rentalPrice"
          value={local.rentalPrice}
          onChange={handleField}
          className={`${s.control} ${s.select}`}
        >
          <option value="">Any</option>
          <option value="30">To $30</option>
          <option value="40">To $40</option>
          <option value="50">To $50</option>
          <option value="60">To $60</option>
          <option value="70">To $70</option>
          <option value="80">To $80</option>
        </select>
      </div>

      <div className={s.filterItem}>
        <label>Car mileage/km</label>
        <div className={s.mileageWrapper}>
          <input
            type="number"
            name="from"
            placeholder="From"
            className={s.control}
            value={local.carMileage.from}
            onChange={handleMileage}
          />
          <input
            type="number"
            name="to"
            placeholder="To"
            className={s.control}
            value={local.carMileage.to}
            onChange={handleMileage}
          />
        </div>
      </div>

      <button className={s.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default FilterCars;
