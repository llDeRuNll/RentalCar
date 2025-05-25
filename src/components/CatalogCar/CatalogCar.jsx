import { Link } from "react-router-dom";
import s from "./CatalogCar.module.css";

const CatalogCar = ({ car }) => {
  const {
    id,
    year,
    brand,
    model,
    type,
    img,
    rentalPrice,
    rentalCompany,
    address,
    mileage,
  } = car;

  const addressParts = address.split(",").map((p) => p.trim());
  const [city, country] = addressParts.slice(-2);

  return (
    <div className={s.card}>
      <div className={s.imageWrapper}>
        <img src={img} alt={`${brand} ${model}`} className={s.image} />
      </div>

      <div className={s.info}>
        <div className={s.titleRow}>
          <h3 className={s.title}>
            {brand}{" "}
            <Link to={`/catalog/${id}`} className={s.modelLink}>
              {model}
            </Link>
            , {year}
          </h3>
          <p className={s.price}>${rentalPrice}</p>
        </div>

        <p className={s.details}>
          {city} | {country} | {rentalCompany} | {type} |{" "}
          {Intl.NumberFormat("en-US").format(mileage)} km
        </p>

        <Link to={`/catalog/${id}`} className={s.readMoreBtn}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default CatalogCar;
