import "./App.css";
import MovieFilter from "./Components/MovieFilter";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import RandomMoviePage from "./pages/RandomMoviePage";
import MoviePage from "./pages/MoviePage";
import Layout from "./Components/Layout";
import ContactFormPage from "./pages/ContactFormPage";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const App = () => {
  const [movies, setMovies] = useState([]);
  //state lift up due to use state variables in app
  const [currentPage, setCurrentPage] = useState(1);
  //totalPages implemented after changing api-source
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_original_language=en&page=${currentPage}&sort_by=popularity.desc`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TMDB_TOKEN}`,
          accept: "application/json",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        //to display less movieCard "slice" implemented to results
        setMovies(data.results.slice(0, 12)); // <-- change with respect to page layout
        setTotalPages(data.total_pages);
      })
      .catch((error) => console.error("Error fetching movies", error));
  }, [currentPage]); //page based render

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <HomePage
              movies={movies}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          }
        />
        <Route path="randommovie" element={<RandomMoviePage />} />
        <Route path="movie/:id" element={<MoviePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="contact" element={<ContactFormPage />} />
      </Route>
    </Routes>
  );
};

export default App;
