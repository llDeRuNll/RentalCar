import { useState, useEffect, useRef } from "react";
import s from "./Catalog.module.css";
import CatalogCar from "../../components/CatalogCar/CatalogCar";
import FilterCars from "../../components/FilterCars/FilterCars";
import Loader from "../../components/Loader/Loader";

const API_URL = "https://car-rental-api.goit.global/cars";

const Catalog = () => {
  const [filters, setFilters] = useState({
    brand: "",
    rentalPrice: "",
    carMileage: { from: "", to: "" },
  });

  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const prevFilters = useRef();

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (JSON.stringify(prevFilters.current) !== JSON.stringify(filters)) {
      prevFilters.current = filters;
      setPage(1);
      setCars([]);
    }
  }, [filters]);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", 8);
      if (filters.brand) params.append("brand", filters.brand);
      if (filters.rentalPrice)
        params.append("rentalPrice", filters.rentalPrice);
      if (filters.carMileage.from)
        params.append("minMileage", filters.carMileage.from);
      if (filters.carMileage.to)
        params.append("maxMileage", filters.carMileage.to);

      try {
        const res = await fetch(`${API_URL}?${params.toString()}`);
        const { cars: newCars, totalPages } = await res.json();
        setCars((prev) => (page === 1 ? newCars : [...prev, ...newCars]));
        setHasMore(page < totalPages);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [
    page,
    filters.brand,
    filters.rentalPrice,
    filters.carMileage.from,
    filters.carMileage.to,
  ]);

  return (
    <div>
      <div className={s.filter}>
        <FilterCars onSearch={setFilters} />
      </div>

      <div className={s.grid}>
        {cars.map((car) => (
          <CatalogCar
            key={car.id}
            car={car}
            isFavorite={favorites.includes(car.id)}
            onToggleFavorite={() => toggleFavorite(car.id)}
          />
        ))}
      </div>

      {loading && <Loader />}

      {!loading && hasMore && (
        <button className={s.loadMoreBtn} onClick={() => setPage((p) => p + 1)}>
          Load more
        </button>
      )}
    </div>
  );
};

export default Catalog;
