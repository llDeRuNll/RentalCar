import Navigation from "../../components/Navigation/Navigation";
import s from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={s.container}>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
