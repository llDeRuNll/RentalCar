import { NavLink } from "react-router-dom";
import s from "./Logo.module.css";

const Logo = () => (
  <NavLink to="/" className={s.logoLink}>
    <span className={s.logoRental}>Rental</span>
    <span className={s.logoCar}>Car</span>
  </NavLink>
);

export default Logo;
