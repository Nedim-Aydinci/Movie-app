import "./App.css";
import { useState, useEffect } from "react";
import MovieWrapper from "./Components/MovieWrapper";
import Pagination from "./Components/Pagination";
import MovieCard from "./Components/MovieCard";
import Footer from "./Components/Footer";

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
      });
  }, [currentPage]); //page based render

  return (
    <>
      <MovieWrapper movies={movies} />;
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <Footer />
    </>
  );
};

export default App;
