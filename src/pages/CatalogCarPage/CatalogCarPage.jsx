import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CatalogCarItem from "../../components/CatalogCarItem/CatalogCarItem";
import Loader from "../../components/Loader/Loader";
import { getCarById } from "../../api";

const CatalogCarPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCarById(id);
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>Auto not found</div>;

  return <CatalogCarItem car={car} />;
};

export default CatalogCarPage;
