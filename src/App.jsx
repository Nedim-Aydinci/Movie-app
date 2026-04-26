import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import RandomMovie from "./pages/RandomMovie";
import Movie from "./pages/Movie";
import Layout from "./Components/Layout";


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
            <Home
              movies={movies}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          }
        />
        <Route path="randommovie" element={<RandomMovie />} />
        <Route path="movie/:id" element={<Movie />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
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
