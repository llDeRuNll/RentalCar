import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("./pages/Catalog/Catalog"));
const CatalogCarPage = lazy(() =>
  import("./pages/CatalogCarPage/CatalogCarPage")
);

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CatalogCarPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </Suspense>
    </Layout>
  );
}

export default App;
