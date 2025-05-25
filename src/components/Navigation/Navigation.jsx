import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import s from "./Navigation.module.css";

const NavigationBar = () => {
  const addActive = ({ isActive }) =>
    isActive ? s.activeLink : s.inactiveLink;

  return (
    <nav className={s.navContainer}>
      <Logo />
      <div className={s.navLinksWrapper}>
        <NavLink className={addActive} to="/">
          Home
        </NavLink>
        <NavLink className={addActive} to="/catalog">
          Catalog
        </NavLink>
      </div>
    </nav>
  );
};

export default NavigationBar;
