import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import RandomMoviePage from "./pages/RandomMoviePage";
import MoviePage from "./pages/MoviePage";
import NotFound from "./pages/NotFoundPage";
import Layout from "./Components/Layout";
import ContactFormPage from "./pages/ContactFormPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="randommovie" element={<RandomMoviePage />} />
        <Route path="movie/:id" element={<MoviePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="contact" element={<ContactFormPage />} />
      </Route>
    </Routes>
  );
};

export default App;
