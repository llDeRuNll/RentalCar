import { FadeLoader } from "react-spinners";
import s from "./Loader.module.css";
const Loader = () => {
  return <FadeLoader className={s.loading} />;
};

export default Loader;
