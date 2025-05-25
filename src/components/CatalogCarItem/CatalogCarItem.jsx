import { TbCurrencyDollar } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";
import { BsCalendar2Week, BsFuelPump } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import s from "./CatalogCarItem.module.css";

const CatalogCarItem = ({ car }) => {
  const displayYear = car.year ?? car.yea ?? "N/A";

  const {
    id,
    brand,
    model,
    type,
    img,
    mileage,
    rentalPrice,
    description,
    address = "",
    rentalConditions = [],
    accessories = [],
    functionalities = [],
    fuelConsumption,
    engineSize,
  } = car;

  const [, city, country] = address.split(",").map((p) => p.trim());
  const extras = [...accessories, ...functionalities];
  const mileageFormatted = Intl.NumberFormat("en-US").format(mileage);

  return (
    <div className={s.mainContainer}>
      <div className={s.imageFormContainer}>
        <img
          src={img}
          alt={`${brand} ${model}`}
          className={s.imageDescription}
        />
        <FormCar />
      </div>

      <div className={s.commonInformation}>
        <div className={s.containerInformation}>
          <h2>
            {brand} <span>{model}</span>
            <span className={s.idSpan}>Id: {id.slice(0, 4)}</span>
          </h2>

          <p className={s.adressMilleage}>
            <IoLocationOutline className={s.locationIcon} />
            {city} {country} | Mileage: {mileageFormatted} km
          </p>

          <p className={s.currencyContainer}>
            <TbCurrencyDollar />
            {rentalPrice}
          </p>

          <p className={s.currencyDescription}>{description}</p>
        </div>

        <div className={s.containerInformation}>
          <h2>Rental Conditions:</h2>
          <ul>
            {rentalConditions.map((cond, idx) => (
              <li key={idx}>
                <FaRegCheckCircle />
                {cond}
              </li>
            ))}
          </ul>
        </div>

        <div className={s.containerInformation}>
          <h2>Car Specifications</h2>
          <ul>
            <li>
              <BsCalendar2Week />
              Year: {displayYear}
            </li>
            <li>
              <FaCar />
              Type: {type}
            </li>
            <li>
              <BsFuelPump />
              Consumption: {fuelConsumption} L/100km
            </li>
            <li>
              <GoGear />
              Engine Size: {engineSize}
            </li>
          </ul>
        </div>

        <div className={s.containerInformation}>
          <h2>Accessories & Functionalities:</h2>
          <ul>
            {extras.map((item, idx) => (
              <li key={idx}>
                <FaRegCheckCircle />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CatalogCarItem;
