import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CatalogCarItem from "../../components/CatalogCarItem/CatalogCarItem";
import Loader from "../../components/Loader/Loader";

const API_URL = "https://car-rental-api.goit.global/cars";

const CatalogCarPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>error {error}</div>;
  if (!car) return <div>Auto not founded</div>;

  return <CatalogCarItem car={car} />;
};

export default CatalogCarPage;
