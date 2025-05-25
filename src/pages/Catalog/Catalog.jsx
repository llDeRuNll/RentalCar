import { useState, useEffect, useRef } from "react";

import s from "./Catalog.module.css";
import CatalogCar from "../../components/CatalogCar/CatalogCar";
import FilterCars from "../../components/FilterCars/FilterCars";
import Loader from "../../components/Loader/Loader";
import { getCars } from "../../api";

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
    const loadCars = async () => {
      setLoading(true);
      try {
        const { cars: newCars, totalPages } = await getCars({
          page,
          limit: 8,
          brand: filters.brand,
          rentalPrice: filters.rentalPrice,
          minMileage: filters.carMileage.from,
          maxMileage: filters.carMileage.to,
        });
        setCars((prev) => (page === 1 ? newCars : [...prev, ...newCars]));
        setHasMore(page < totalPages);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, [page, filters]);

  return (
    <div>
      <div className={s.filter}>
        <FilterCars onSearch={setFilters} />
      </div>
      {loading && <Loader />}
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
      {!loading && hasMore && (
        <button className={s.loadMoreBtn} onClick={() => setPage((p) => p + 1)}>
          Load more
        </button>
      )}
    </div>
  );
};

export default Catalog;
