import { Link } from "react-router-dom";
import s from "./HomePage.module.css";

const HomePage = () => (
  <div className={s.homePageContainer}>
    <div className={s.homepagetextWrapper}>
      <h1>Find your perfect rental car</h1>
      <p>Reliable and budget-friendly rentals for any journey</p>
      <Link to="/catalog" className={s.ctaButton}>
        View Catalog
      </Link>
    </div>
  </div>
);

export default HomePage;
