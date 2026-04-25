import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Favotites from "./pages/Favorites";
import RandomMovie from "./pages/RandomMovie";
import Movie from "./pages/Movie";
import MovieWrapper from "./Components/MovieWrapper";
import Pagination from "./Components/Pagination";
import RandomBtn from "./Components/RandomMovie";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

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
      <Route path="/" element={<Home />} />
      <Route path="/randommovie" element={<RandomMovie />} />
      <Route path="/movie" element={<Movie />} />
      <Route path="/favorites" element={<Favotites />} />
    </Routes>
  );
  /*return (
    <>
      <Navbar />
      <MovieWrapper movies={movies} />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <Footer />
    </>
  );*/
};

export default App;
